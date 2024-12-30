import Author from "../../modules/author/author.model.js";
// POST request to create a new author
export const createAuthor = async (req, res) => {
    const { name, bio, birthDate } = req.body;  // Destructure data from the request body
    try {
        // Create a new Author instance and save it to the database
        const newAuthor = await Author.create({ name, bio, birthDate });
        res.status(201).json(newAuthor);  // Return the created author in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET request to retrieve all authors
export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();  // Find all authors in the database
        res.status(200).json({ msg: "done", authors });  // Return the list of authors in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// GET request to retrieve a single author by ID
export const getAuthorByID = async (req, res) => {
    const { id } = req.params;  // Get the author ID from the URL params
    try {
        const author = await Author.findById(id).populate('books');  // Find the author by ID and populate the books field
        if (!author) {
            return res.status(404).json({ msg: "Author not found" });
        }
        res.status(200).json({ msg: "done", author });  // Return the author data in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// PATCH request to update an author by ID
export const updateAuthor = async (req, res) => {
    const { id } = req.params;  // Get the author ID from the URL params
    const updateData = req.body;
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedAuthor) {
            return res.status(404).json({ msg: "Author not found" });
        }
        res.status(200).json({ msg: "done", author: updatedAuthor });  // Return the updated author in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// DELETE request to delete an author by ID
export const deleteAuthor = async (req, res) => {
    const { id } = req.params;  // Get the author ID from the URL params
    try {
        const deletedAuthor = await Author.findByIdAndDelete(id);  // Delete the author by ID
        if (!deletedAuthor) {
            return res.status(404).json({ msg: "Author not found" });
        }
        res.status(200).json({ msg: "done", author: deletedAuthor });  // Return the deleted author in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Pagination request for authors
export const pagination = async (req, res, next) => {
    try {
        // Destructure the page and limit from the query string, and set default values
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Query MongoDB to get authors, limit the results and skip based on the page
        const authors = await Author.find({})
            .limit(limitNumber) // Limit the number of results per page
            .skip((pageNumber - 1) * limitNumber)
            .sort({ createdAt: -1 }); // Sort by creation date in descending order (newest first)

        // Count the total number of authors in the database
        const count = await Author.countDocuments();

        // Calculate the total number of pages based on the count of authors and limit
        return res.status(200).json({
            authors, // The paginated list of authors
            totalPages: Math.ceil(count / limitNumber),
            currentPage: pageNumber,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

