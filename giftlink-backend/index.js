import dotenv from "dotenv";
import natural from "natural";
import app from "./app.js";

dotenv.config();

// Task 8: import and use the natural npm package.
const tokenizer = new natural.WordTokenizer();
const startupTokens = tokenizer.tokenize("GiftLink search service ready");

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`GiftLink API running on port ${PORT}`);
  console.log("Natural tokenizer loaded:", startupTokens.join(", "));
});
