import Author from "./author.model.js"; // Assuming you're using Mongoose for MongoDB

// Pagination: Fetch authors with pagination support
export const pagination = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 authors
        const authors = await Author.find()
            .skip((page - 1) * limit) // Skip the authors based on the current page
            .limit(limit * 1); // Limit the number of authors per page

        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching authors with pagination', details: error.message });
    }
};

// Get all authors
export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching authors', details: error.message });
    }
};

// Create a new author
export const createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const newAuthor = new Author({ name, bio });

        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ error: 'Error creating author', details: error.message });
    }
};

// Get author by ID (includes books)
export const getAuthorByID = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books'); // Assuming "books" is a reference field
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching author by ID', details: error.message });
    }
};

// Delete an author by ID
export const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting author', details: error.message });
    }
};

// Update an author's details by ID
export const updateAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            { name, bio },
            { new: true }
        );

        if (!updatedAuthor) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ error: 'Error updating author', details: error.message });
    }
};
