import { Router } from "express";
const router = Router();
import * as BC from "./author.controller.js"; // Importing controller functions

// Pagination: Fetch authors with pagination support
router.get("/pagination", BC.pagination);

// Get all authors
router.get("/getAuthors", BC.getAuthors);

// Create a new author
router.post("/createAuthor", BC.createAuthor);

// Get author by ID (includes books)
router.get("/:id", BC.getAuthorByID);

// Delete an author by ID
router.delete("/:id", BC.deleteAuthor);

// Update an author's details by ID
router.patch("/:id", BC.updateAuthor);

export default router;
