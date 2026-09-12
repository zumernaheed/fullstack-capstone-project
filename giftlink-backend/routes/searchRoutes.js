import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

function escapeRegex(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/", async (req, res) => {
  try {
    const { q = "", category = "" } = req.query;
    const filter = {};

    // Task 6: filter items by category.
    if (category.trim()) {
      filter.category = { $regex: `^${escapeRegex(category.trim())}$`, $options: "i" };
    }

    if (q.trim()) {
      const term = { $regex: escapeRegex(q.trim()), $options: "i" };
      filter.$or = [
        { name: term },
        { description: term },
        { category: term },
        { location: term }
      ];
    }

    const db = await connectToDatabase();
    const gifts = await db.collection("gifts").find(filter).toArray();
    res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
});

export default router;
