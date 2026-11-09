import { Router } from "express";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createModel } from "./modelFactory.js";
import { SYSTEM_PROMPT, buildCheckupUserPrompt } from "./checkupPrompt.js";
import { trackLlmCall } from "./observability/metrics.js";

const router = Router();
const model = createModel();

router.post("/ai/checkup-summary", async (req, res) => {
  try {
    const userPrompt = buildCheckupUserPrompt(req.body);

    const aiMessage = await trackLlmCall("checkup-summary", process.env.AI_MODEL_NAME, () =>
      model.invoke([new SystemMessage(SYSTEM_PROMPT), new HumanMessage(userPrompt)]),
    );

    const summary = (aiMessage.content ?? "").toString().trim();
    req.log.info({ summaryLength: summary.length }, "Checkup-Zusammenfassung erstellt");

    res.json({ summary });
  } catch (error) {
    req.log.error({ err: error }, "Checkup-Zusammenfassung fehlgeschlagen");
    res.status(500).json({ error: "KI-Service aktuell nicht erreichbar. Bitte versuche es später erneut." });
  }
});

export default router;