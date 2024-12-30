import express from 'express';
import dotenv from 'dotenv';
import connectionDB from './db/connection.js';
import AuthorRouter from './src/modules/author/author.routes.js'; // Author routes
import BookRouter from './src/modules/book/book.routes.js'; // Book routes

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectionDB();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(express.static('public')); // Serve static files

// Routes
app.use("/authors", AuthorRouter); // Register author routes
app.use("/books", BookRouter); // Register book routes

// 404 Handler
app.use('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
