declare module 'openai-edge' {
  export class Configuration {
    constructor(options: { apiKey: string | undefined });
    apiKey: string | undefined;
  }

  export class OpenAIApi {
    constructor(configuration: Configuration);
    createChatCompletion(options: {
      model: string;
      messages: Array<{ role: string; content: string }>;
      temperature?: number;
      stream?: boolean;
    }): Promise<Response>;
  }
}
