import { Router } from "express";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createModel } from "./modelFactory.js";
import { SYSTEM_PROMPT, buildCheckupUserPrompt } from "./checkupPrompt.js";

const router = Router();
const model = createModel();

router.post("/ai/checkup-summary", async (req, res) => {
  try {
    const userPrompt = buildCheckupUserPrompt(req.body);

    const aiMessage = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(userPrompt),
    ]);

    const summary = (aiMessage.content ?? "").toString().trim();

    res.json({ summary });
  } catch (error) {
    console.error("Checkup AI Error:", error.message);
    res.status(500).json({ error: "KI-Service aktuell nicht erreichbar. Bitte versuche es später erneut." });
  }
});

export default router;