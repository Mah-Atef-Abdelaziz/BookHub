import { Router } from "express"; 
const router = Router(); 
import * as BC from "./book.controller.js"; // Importing controller functions

// Pagination: Fetch books with pagination support
router.get("/pagination", BC.pagination);

// Get all books
router.get("/getBook", BC.getBook);

// Create a new book
router.post("/createBook", BC.createBook);

// Get a book by ID
router.get("/:id", BC.getBookByID);

// Delete a book by ID
router.delete("/:id", BC.DeleteBook);

// Update a book's details by ID
router.patch("/:id", BC.updateBook);

export default router;
