import { IAIProviderFactory } from "./IAIProviderFactory.js";
import { ChatOpenAI } from "@langchain/openai";
import { createPrompt } from "../promptFactory.js";

/**
 * Konkrete Abstract Factory – OpenAI-Provider (z.B. GPT-4o).
 *
 * Vorbereitet für den Fall, dass der Projektbetreiber von Mistral auf
 * native OpenAI-Modelle wechseln möchte. Benötigt eigene Env-Variablen:
 *   OPENAI_API_KEY   – offizieller OpenAI API-Key
 *   OPENAI_MODEL_NAME – z.B. "gpt-4o" oder "gpt-3.5-turbo"
 *
 * Nutzung:
 *   const factory = new OpenAIProviderFactory();
 *   const model  = factory.createModel();
 *   const prompt = factory.createPrompt("medicalHistory");
 */
export class OpenAIProviderFactory extends IAIProviderFactory {
  /** @param {object} [overrides] */
  createModel(overrides = {}) {
    return new ChatOpenAI({
      model: process.env.OPENAI_MODEL_NAME || "gpt-4o",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.1,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "adam-med-app-prototype",
      },
      ...overrides,
    });
  }

  /** @param {string} type */
  createPrompt(type) {
    return createPrompt(type); // Prompts sind provider-unabhängig
  }
}
