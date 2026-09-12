import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db.js";

const router = express.Router();

// Get all gifts
router.get("/api/gifts", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const gifts = await db
      .collection("gifts")
      .find({})
      .toArray();

    res.status(200).json(gifts);
  } catch (error) {
    console.error("Error fetching gifts:", error);

    res.status(500).json({
      message: "Unable to fetch gifts",
      error: error.message
    });
  }
});

// Get one gift by ID
router.get("/api/gifts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid gift id"
      });
    }

    const db = await connectToDatabase();

    const gift = await db
      .collection("gifts")
      .findOne({
        _id: new ObjectId(id)
      });

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.status(200).json(gift);
  } catch (error) {
    console.error("Error fetching gift:", error);

    res.status(500).json({
      message: "Unable to fetch gift",
      error: error.message
    });
  }
});

export default router;