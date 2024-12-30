import express from 'express';
import dotenv from 'dotenv';
import connectiontDB from './db/connection.js';

import AuthorRouter from './modules/author/author.routes.js';
import bookRouter from './modules/book/book.routes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectiontDB();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Routes
app.use("/authors", AuthorRouter);
app.use("/books", bookRouter);

// 404 Handler
app.use('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
