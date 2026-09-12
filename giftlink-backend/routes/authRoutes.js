import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Task 11: registration API
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, location = "" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const db = await connectToDatabase();
    const users = db.collection("users");
    const normalizedEmail = email.trim().toLowerCase();

    if (await users.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      location: location.trim(),
      createdAt: new Date()
    };

    const result = await users.insertOne(user);
    res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// Task 11: login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email: email?.trim().toLowerCase() });

    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, location: user.location || "" }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Task 11: update user information API
router.put("/update", requireAuth, async (req, res) => {
  try {
    const { name, location } = req.body;
    const update = {};
    if (typeof name === "string" && name.trim()) update.name = name.trim();
    if (typeof location === "string") update.location = location.trim();

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "No valid profile fields supplied" });
    }

    const db = await connectToDatabase();
    const result = await db.collection("users").findOneAndUpdate(
      { email: req.user.email },
      { $set: update },
      { returnDocument: "after", projection: { passwordHash: 0 } }
    );

    if (!result) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user: result });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

export default router;
