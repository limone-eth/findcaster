import { Vector } from '@pinecone-database/pinecone';
import { pipeline, Pipeline } from '@xenova/transformers';
import { Embeddings, EmbeddingsParams } from 'langchain/embeddings/base';

interface TransformersJSEmbeddingParams extends EmbeddingsParams {
  modelName: string;
  onEmbeddingDone?: (embeddings: Vector[]) => void;
}

class TransformersJSEmbedding extends Embeddings implements TransformersJSEmbeddingParams {
  modelName: string;

  pipe: Pipeline | null = null;

  constructor(params: TransformersJSEmbeddingParams) {
    super(params);
    this.modelName = params.modelName;
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    this.pipe = this.pipe || (await pipeline('feature-extraction', this.modelName));

    return await Promise.all(texts.map(async (text) => this.embedQuery(text)));
  }

  async embedQuery(text: string): Promise<number[]> {
    this.pipe = this.pipe || (await pipeline('feature-extraction', this.modelName));

    const result = await this.pipe(text, {
      pooling: 'mean',
      normalize: true,
    });
    return Array.from(result.data) as number[];
  }
}

export { TransformersJSEmbedding };
