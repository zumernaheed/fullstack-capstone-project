import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db.js";

const router = express.Router();

// Task 5: route serving /api/gifts
router.get("/api/gifts", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection("gifts").find({}).toArray();
    res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch gifts", error: error.message });
  }
});

// Task 5: route serving /api/gifts/:id
router.get("/api/gifts/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid gift id" });
    }

    const db = await connectToDatabase();
    const gift = await db.collection("gifts").findOne({ _id: new ObjectId(req.params.id) });

    if (!gift) return res.status(404).json({ message: "Gift not found" });
    res.status(200).json(gift);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch gift", error: error.message });
  }
});

// Optional project feature: concurrency-safe comment append using atomic $push.
router.post("/api/gifts/:id/comments", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid gift id" });
    }

    const { user, text } = req.body;
    if (!user || !text) return res.status(400).json({ message: "user and text are required" });

    const db = await connectToDatabase();
    const comment = { user, text, createdAt: new Date() };
    const result = await db.collection("gifts").findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $push: { comments: comment } },
      { returnDocument: "after" }
    );

    if (!result) return res.status(404).json({ message: "Gift not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Unable to add comment", error: error.message });
  }
});

export default router;
