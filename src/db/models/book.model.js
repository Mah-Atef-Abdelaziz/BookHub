import { Schema, model } from "mongoose";

// Defining the Book schema with fields: title, content, author (reference to Author model), and publishedDate
const bookSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },  // Reference to the Author who wrote the book
    publishedDate: { type: Date, default: Date.now }
});

const Book = model('Book', bookSchema);

export default Book;
