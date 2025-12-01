import express from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../A1/dist")));

app.use(express.json());

let versions = [];
const TWO_HOURS = 2 * 60 * 60 * 1000;

const pad = (n) => n.toString().padStart(2, "0");
const formatTimestamp = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
         `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const findDiff = (oldText = "", newText = "") => {
  const toWords = (txt) =>
    txt.trim().split(/\s+/).filter(Boolean);
//   console.log(txt.trim().split(/\s+/).filter(Boolean));

  const oldWords = new Set(toWords(oldText));
  const newWords = new Set(toWords(newText));

  const addedWords = [...newWords].filter((w) => !oldWords.has(w));
  const removedWords = [...oldWords].filter((w) => !newWords.has(w));

  return { addedWords, removedWords };
};

const pruneOldEntries = () => {
  const now = Date.now();
  versions = versions.filter((v) => now - v.createdAtMs <= TWO_HOURS);
};

app.post("/save-version", (req, res) => {
  const { oldText = "", newText = "" } = req.body || {};
  const { addedWords, removedWords } = findDiff(oldText, newText);

  const entry = {
    id: uuidv4(),
    timestamp: formatTimestamp(),
    addedWords,
    removedWords,
    oldLength: oldText.length,
    newLength: newText.length,
    createdAtMs: Date.now()
  };

  versions.unshift(entry);
  pruneOldEntries();

  const { createdAtMs, ...visibleEntry } = entry;
  res.status(201).json(visibleEntry);
});

app.get("/versions", (req, res) => {
  pruneOldEntries();
  const sanitized = versions.map(({ createdAtMs, ...rest }) => rest);
  res.json(sanitized);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
