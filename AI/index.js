import express from "express";
import dotenv from "dotenv";
import medicalRouter from "./medicalHistoryExplanation.js";
import checkupRouter from "./checkupSummary.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", medicalRouter);
app.use("/", checkupRouter);

app.listen(3000, () => {
  console.log("✅ Med-AI-Service läuft auf Port 3000");
});
