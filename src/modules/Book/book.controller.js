// Importing the Book and Author models for database operations

import Book from "../../modules/book/book.model.js";
import Author from "../../modules/author/author.model.js";

// POST request to create a new book
export const createBook = async (req, res) => {
    const { title, content, authorId, publishedDate } = req.body;
    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ msg: "Author not found" });
        }

        const newBook = await Book.create({ title, content, author: authorId, publishedDate });
        author.books.push(newBook._id);
        await author.save();

        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET request to retrieve all books
export const getBook = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ msg: "done", books });  // Return the list of books in the response
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// GET request to retrieve a single book by ID
export const getBookByID = async (req, res) => {
    const { id } = req.params;  // Get the book ID from the URL params
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "done", book });  // Return the book data in the response
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// PATCH request to update a book by ID
export const updateBook = async (req, res) => {
    const { id } = req.params;  // Get the book ID from the URL params
    const updateData = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "done", book: updatedBook });  // Return the updated book in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// DELETE request to delete a book by ID
export const DeleteBook = async (req, res) => {
    const { id } = req.params;  // Get the book ID from the URL params
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "done", book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Pagination request for books
export const pagination = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  // Get pagination parameters
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const books = await Book.find({})  // Find books with pagination
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .sort({ createdAt: -1 });  // Sort books by creation date

        const count = await Book.countDocuments();  // Get the total count of books

        return res.status(200).json({
            books,
            totalPages: Math.ceil(count / limitNumber),  // Calculate total pages
            currentPage: pageNumber,  // Return the current page number
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
