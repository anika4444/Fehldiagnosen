import { StringOutputParser } from "@langchain/core/output_parsers";

/**
 * Builder – baut eine LangChain-Pipeline schrittweise auf.
 *
 * Grundnutzung:
 *   const chain = new ChainBuilder()
 *     .withPrompt(prompt)
 *     .withModel(model)
 *     .withParser(new StringOutputParser())
 *     .build();
 *
 * Erweiterbar mit:
 *   .withRetry(maxAttempts)   → zukünftige Retry-Logik auf Chain-Ebene
 *   .withValidator(fn)        → zukünftige Validator-Step-Einbindung
 */
export class ChainBuilder {
  #prompt = null;
  #model = null;
  #parser = null;
  // Platzhalter für zukünftige Erweiterungen:
  // #maxRetries = 0;
  // #validatorFn = null;

  /** @param {import("@langchain/core/prompts").ChatPromptTemplate} prompt */
  withPrompt(prompt) {
    this.#prompt = prompt;
    return this; // Fluent Interface
  }

  /** @param {import("@langchain/openai").ChatOpenAI} model */
  withModel(model) {
    this.#model = model;
    return this;
  }

  /**
   * @param {import("@langchain/core/output_parsers").BaseOutputParser} [parser]
   * Wenn kein Parser übergeben wird, wird StringOutputParser als Default genutzt.
   */
  withParser(parser = new StringOutputParser()) {
    this.#parser = parser;
    return this;
  }

  // Vorbereitet für zukünftige Retry-Logik auf Pipeline-Ebene:
  // withRetry(maxAttempts = 3) { this.#maxRetries = maxAttempts; return this; }

  // Vorbereitet für Validator als fester Step in der Chain:
  // withValidator(validatorFn) { this.#validatorFn = validatorFn; return this; }

  /**
   * Baut die fertige Chain zusammen.
   * @throws {Error} wenn Prompt oder Modell fehlen
   * @returns {import("@langchain/core/runnables").RunnableSequence}
   */
  build() {
    if (!this.#prompt) throw new Error("ChainBuilder: withPrompt() wurde nicht aufgerufen.");
    if (!this.#model) throw new Error("ChainBuilder: withModel() wurde nicht aufgerufen.");
    if (!this.#parser) throw new Error("ChainBuilder: withParser() wurde nicht aufgerufen.");

    return this.#prompt.pipe(this.#model).pipe(this.#parser);
  }
}
