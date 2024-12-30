import Book from "./book.model.js"; // Assuming you're using Mongoose for MongoDB

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books', details: error.message });
    }
};

// Create a new book
export const createBook = async (req, res) => {
    try {
        const { title, author, genre, publishedDate } = req.body;

        // Create a new book instance
        const newBook = new Book({ title, author, genre, publishedDate });

        // Save the new book to the database
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: 'Error creating book', details: error.message });
    }
};

// Get a book by ID
export const getBookByID = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book by ID', details: error.message });
    }
};

// Update a book's details by ID
export const updateBook = async (req, res) => {
    try {
        const { title, author, genre, publishedDate } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, genre, publishedDate },
            { new: true } // Returns the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book', details: error.message });
    }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book', details: error.message });
    }
};
