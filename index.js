import "dotenv/config";
import express from "express";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import { extractGeneratedText } from "./utils.js";

const app = express();
const upload = multer();
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL
const DEFAULT_PORT = process.env.PORT || 3000;

app.use(express.json());

// Generate text
app.post("/generate-text", async (req, res) => {
  try {
    const prompt = req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required!" });
    }

    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: prompt,
    });

    return res.json({ result: extractGeneratedText(response) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Generate from image
app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body)
    const prompt = req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required!" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File 'image' harus di-upload!" });
    }
    const imgBase64 = file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: [
        { text: prompt },
        { inlineData: { mimeType: file.mimetype, data: imgBase64 } },
      ],
    });

    return res.json({ result: extractGeneratedText(response) });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Generate from audio
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  try {
    const prompt = req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required!" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File 'audio' harus di-upload!" });
    }
    const audioBase64 = file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: [
        { text: prompt },
        { inlineData: { mimeType: file.mimetype, data: audioBase64 } },
      ],
    });

    return res.json({ result: extractGeneratedText(response) });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Generate from audio
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  try {
    const prompt = req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required!" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File 'audio' harus di-upload!" });
    }
    const audioBase64 = file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: [
        { text: prompt },
        { inlineData: { mimeType: file.mimetype, data: audioBase64 } },
      ],
    });

    return res.json({ result: extractGeneratedText(response) });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(DEFAULT_PORT, () => {
  console.log(`Buka di sini: http://localhost:${DEFAULT_PORT}`);
});
