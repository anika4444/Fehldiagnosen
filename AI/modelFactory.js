import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();

// ─── Basis-Konfiguration (aus .env) ─────────────────────────────────────────
const BASE_CONFIG = {
  apiKey: process.env.AI_API_KEY,
  configuration: {
    baseURL: process.env.AI_BASE_URL,
  },
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "adam-med-app-prototype",
  },
};

/**
 * Factory Method – erstellt das Hauptmodell (Erklärungsgenerator).
 * @param {object} overrides  – z.B. { temperature: 0.5 } für einen anderen Use Case
 * @returns {ChatOpenAI}
 */
export function createModel(overrides = {}) {
  return new ChatOpenAI({
    ...BASE_CONFIG,
    model: process.env.AI_MODEL_NAME,
    temperature: 0.1,
    ...overrides,
  });
}

/**
 * Factory Method – erstellt das Validator-Modell (strenge Prüfinstanz).
 * @param {object} overrides  – z.B. { model: "anderes-modell" }
 * @returns {ChatOpenAI}
 */
export function createValidatorModel(overrides = {}) {
  return new ChatOpenAI({
    ...BASE_CONFIG,
    model: process.env.VALIDATOR_MODEL_NAME,
    temperature: 0.0,
    ...overrides,
  });
}
