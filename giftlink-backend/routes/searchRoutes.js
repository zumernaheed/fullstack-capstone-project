import express from "express";
import { connectToDatabase } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { category, q } = req.query;

    const filter = {};

    // Filter by category
    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i"
      };
    }

    // Search by keyword
    if (q) {
      filter.$or = [
        {
          name: {
            $regex: q,
            $options: "i"
          }
        },
        {
          description: {
            $regex: q,
            $options: "i"
          }
        }
      ];
    }

    const gifts = await db
      .collection("gifts")
      .find(filter)
      .toArray();

    res.status(200).json(gifts);
  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      message: "Unable to search gifts",
      error: error.message
    });
  }
});

export default router;