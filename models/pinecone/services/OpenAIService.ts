import { OpenAI, PromptTemplate } from 'langchain';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

const templates = {
  peopleQuery: `Context: {context}\n
       Given the data above, you should follow all the following rules when answering the users question:
        - There will be a context, a question, a format, and you should work step by step in figuring out an answer to the users question.
        - Find profiles that are a perfect match for the question provided AND include a reason for this. Find a maximum of 5 unique profiles.
        - Usernames matching the query are not a valid reason for a profile to be a match.
        - Avoid inventing reasons for profiles to be a match. The reason should be based on the profile itself.
        - Step by step, give a valid reason for each profile you have matched for the question. The reason should belong to the profile. Use maximum 520 characters for each profile reason.
        - You are absolutely prohibited from answering with a profile that is not included in the context provided.
        - If you cannot find any profile that matches the question well enough, you should answer with: I couldn't find any matches to your query.\n
        Format: {format_instructions}\n 
        Question: {question}`,
};

export const askOpenAI = async (question: string, context: string) => {
  // 9. Create an OpenAI instance and load the QAStuffChain
  const llm = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
  });

  const template = templates.peopleQuery;
  const outputParser = StructuredOutputParser.fromZodSchema(
    z
      .object({
        profiles: z
          .object({
            profileId: z.string().describe('The profileId of a matching profile'),
            reason: z.string().describe('Generate a reason why this profile is a good match'),
          })
          .array()
          .describe('JSON array of profiles'),
      })
      .describe('Use the profileId from documents provided')
  );
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ['question', 'context'],
    partialVariables: { format_instructions: outputParser.getFormatInstructions() },
  });
  const input = await promptTemplate.format({
    question,
    context,
    verbose: true,
  });
  const response = await llm.call(input);
  return {
    response,
    question,
  };
};
