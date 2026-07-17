import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { readProducts, writeProducts, slugify, uniqueSlug } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "whimsy2026";
const JWT_SECRET = process.env.JWT_SECRET || "please-change-this-secret";

const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}

function deleteImageFile(url) {
  if (!url || !url.startsWith("/uploads/")) return; // never touch external placeholder URLs
  const filePath = path.join(__dirname, url.replace(/^\//, ""));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

/* ------------------------------ Public routes ------------------------------ */

app.get("/api/products", (_req, res) => {
  res.json(readProducts());
});

app.get("/api/products/:slug", (req, res) => {
  const product = readProducts().find((p) => p.slug === req.params.slug);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

/* -------------------------------- Admin auth -------------------------------- */

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Incorrect password" });
  }
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
  res.json({ token });
});

app.get("/api/admin/verify", requireAdmin, (_req, res) => res.json({ ok: true }));

/* --------------------------- Admin product CRUD --------------------------- */

app.post("/api/admin/products", requireAdmin, upload.array("images", 8), (req, res, next) => {
  try {
    const products = readProducts();
    const { name, category, shortDescription, description, details } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    const slug = uniqueSlug(slugify(name), products);
    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);

    const product = {
      id: crypto.randomUUID(),
      slug,
      name,
      category,
      shortDescription: shortDescription || "",
      description: description || "",
      details: details ? JSON.parse(details) : [],
      images,
    };

    products.push(product);
    writeProducts(products);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

app.put("/api/admin/products/:id", requireAdmin, upload.array("images", 8), (req, res, next) => {
  try {
    const products = readProducts();
    const idx = products.findIndex((p) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const existing = products[idx];
    const { name, category, shortDescription, description, details, keepImages } = req.body;

    const newImages = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const kept = keepImages ? JSON.parse(keepImages) : existing.images;

    // Remove any uploaded files that were dropped from the form.
    existing.images.filter((img) => !kept.includes(img)).forEach(deleteImageFile);

    let slug = existing.slug;
    if (name && name !== existing.name) {
      slug = uniqueSlug(slugify(name), products, existing.id);
    }

    const updated = {
      ...existing,
      name: name ?? existing.name,
      slug,
      category: category ?? existing.category,
      shortDescription: shortDescription ?? existing.shortDescription,
      description: description ?? existing.description,
      details: details ? JSON.parse(details) : existing.details,
      images: [...kept, ...newImages],
    };

    products[idx] = updated;
    writeProducts(products);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/admin/products/:id", requireAdmin, (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });

  product.images.forEach(deleteImageFile);
  writeProducts(products.filter((p) => p.id !== req.params.id));
  res.status(204).end();
});

/* ------------------------ Serve built frontend (prod) ------------------------ */

const distDir = path.join(__dirname, "..", "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) return next();
    res.sendFile(path.join(distDir, "index.html"));
  });
}

// Basic error handler — must be last.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(400).json({ error: err.message || "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Whimsy Core API running at http://localhost:${PORT}`);
});
