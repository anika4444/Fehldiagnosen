import { IAIProviderFactory } from "./IAIProviderFactory.js";
import { createModel, createValidatorModel } from "../modelFactory.js";
import { createPrompt } from "../promptFactory.js";

/**
 * Konkrete Abstract Factory – Mistral-Provider.
 *
 * Verwendet die Env-Variablen AI_MODEL_NAME und VALIDATOR_MODEL_NAME,
 * die im Mistral-Setup auf devstral-2 bzw. Mistral Nemo zeigen.
 *
 * Nutzung:
 *   const factory = new MistralProviderFactory();
 *   const model  = factory.createModel();
 *   const prompt = factory.createPrompt("medicalHistory");
 */
export class MistralProviderFactory extends IAIProviderFactory {
  /** @param {object} [overrides] */
  createModel(overrides = {}) {
    return createModel(overrides); // nutzt AI_MODEL_NAME aus .env
  }

  /** @param {string} type */
  createPrompt(type) {
    return createPrompt(type);
  }

  /**
   * Bequemlichkeits-Methode: gibt direkt das Validator-Modell zurück.
   * Nicht Teil des Interfaces, aber praktisch für den Service-Code.
   * @param {object} [overrides]
   */
  createValidatorModel(overrides = {}) {
    return createValidatorModel(overrides); // nutzt VALIDATOR_MODEL_NAME aus .env
  }
}
