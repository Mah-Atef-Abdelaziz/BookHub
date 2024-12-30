import mongoose from 'mongoose';

// Define the schema for the book
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    }
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt

// Create the Book model based on the schema
const Book = mongoose.model('Book', bookSchema);

export default Book;
