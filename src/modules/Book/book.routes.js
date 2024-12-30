import { Router } from "express";
import * as BC from "./book.controller.js"; // Importing controller functions

const router = Router();

// Get all books
router.get("/getBooks", BC.getBooks);

// Create a new book
router.post("/createBook", BC.createBook);

// Get a book by ID
router.get("/:id", BC.getBookByID);

// Update a book's details by ID
router.patch("/:id", BC.updateBook);

// Delete a book by ID
router.delete("/:id", BC.deleteBook);

export default router;
