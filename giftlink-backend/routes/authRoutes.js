import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db.js";

const router = express.Router();

/* =========================================================
   REGISTER USER
========================================================= */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, location = "" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const db = await connectToDatabase();

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await db.collection("users").findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      location: location.trim(),
      createdAt: new Date()
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Unable to register user",
      error: error.message
    });
  }
});


/* =========================================================
   LOGIN USER
========================================================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const db = await connectToDatabase();

    const user = await db.collection("users").findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Unable to login",
      error: error.message
    });
  }
});


/* =========================================================
   UPDATE USER
========================================================= */

router.put("/update", async (req, res) => {
  try {
    const authorization = req.headers.authorization;

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Authorization token required"
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const db = await connectToDatabase();

    const updates = {};

    if (req.body.name) {
      updates.name = req.body.name.trim();
    }

    if (req.body.location) {
      updates.location = req.body.location.trim();
    }

    if (req.body.email) {
      updates.email = req.body.email
        .trim()
        .toLowerCase();
    }

    if (req.body.password) {
      updates.password = await bcrypt.hash(
        req.body.password,
        10
      );
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No update information provided"
      });
    }

    const userId = new ObjectId(decoded.userId);

    const result = await db.collection("users").updateOne(
      {
        _id: userId
      },
      {
        $set: updates
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const updatedUser = await db.collection("users").findOne(
      {
        _id: userId
      },
      {
        projection: {
          password: 0
        }
      }
    );

    res.status(200).json({
      message: "User information updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Update error:", error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token"
      });
    }

    res.status(500).json({
      message: "Unable to update user",
      error: error.message
    });
  }
});

export default router;