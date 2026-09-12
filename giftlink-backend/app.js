import express from "express";
import cors from "cors";
import giftRoutes from "./routes/giftRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "GiftLink API" });
});

app.use(giftRoutes);

// Task 7: app.js includes a route serving /api/search.
app.use("/api/search", searchRoutes);

app.use("/api/auth", authRoutes);

export default app;
