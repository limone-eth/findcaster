import { randomUUID } from 'crypto';

import { Vector } from '@pinecone-database/pinecone';
import { Pipeline, pipeline } from '@xenova/transformers';
import { Document } from 'langchain/document';

type DocumentOrString = Document | string;

const sliceIntoChunks = <T>(arr: T[], chunkSize: number) =>
  Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) => arr.slice(i * chunkSize, (i + 1) * chunkSize));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isString(test: any): test is string {
  return typeof test === 'string';
}

class Embedder {
  private pipe: Pipeline;

  async init(modelName: string) {
    this.pipe = await pipeline('feature-extraction', modelName, { quantized: false });
  }

  // Embeds a text and returns the embedding
  async embed(text: string, metadata?: Record<string, unknown>): Promise<Vector> {
    const result = await this.pipe(text);
    const id = (metadata?.id as string) || randomUUID();

    return {
      id,
      metadata: metadata || {
        text,
      },
      values: Array.from(result.data),
    };
  }

  // Embeds a batch of documents and calls onDoneBatch with the embeddings
  async embedBatch(documents: DocumentOrString[], batchSize: number, onDoneBatch: (embeddings: Vector[]) => void) {
    const batches = sliceIntoChunks<DocumentOrString>(documents, batchSize);
    // eslint-disable-next-line no-restricted-syntax
    for await (const batch of batches) {
      const embeddings = await Promise.all(
        batch.map((documentOrString) =>
          isString(documentOrString)
            ? this.embed(documentOrString)
            : this.embed(documentOrString.pageContent, documentOrString.metadata)
        )
      );
      await onDoneBatch(embeddings);
    }
  }
}

const embedder = new Embedder();
export { embedder };
