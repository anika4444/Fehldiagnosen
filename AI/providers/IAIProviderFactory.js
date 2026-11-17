/**
 * Abstract Factory – Interface / Basisklasse für alle KI-Provider-Factories.
 *
 * Konvention: Jede konkrete Implementierung MUSS beide Methoden überschreiben.
 * JavaScript hat kein natives Interface-Keyword – diese Klasse erzwingt die
 * Implementierung zur Laufzeit (throws), was für Schulungsprojekte ausreichend ist.
 *
 * Konkrete Implementierungen:
 *   - MistralProviderFactory  → providers/MistralProviderFactory.js
 *   - OpenAIProviderFactory   → providers/OpenAIProviderFactory.js
 */
export class IAIProviderFactory {
  /**
   * Erstellt das Hauptmodell des Providers.
   * @param {object} [overrides] – optionale Parameter-Überschreibungen
   * @returns {import("@langchain/openai").ChatOpenAI}
   */
  createModel(overrides = {}) {
    throw new Error(`${this.constructor.name} muss createModel() implementieren.`);
  }

  /**
   * Erstellt den passenden Prompt für den angegebenen Typ.
   * @param {string} type – z.B. "medicalHistory", "validator"
   * @returns {import("@langchain/core/prompts").ChatPromptTemplate}
   */
  createPrompt(type) {
    throw new Error(`${this.constructor.name} muss createPrompt() implementieren.`);
  }
}
