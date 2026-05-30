import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose
  .connect(process.env.DB)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error("DB connection error:", err);
  });

import express from "express";
import cors from "cors";
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  updateProduct,
} from "./controller/product.controller.js";
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// JSON parse error handler (catches malformed JSON bodies)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON received:", err.message);
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

//endpoints
app.post("/products", createProduct);
app.get("/products", fetchProduct);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);
