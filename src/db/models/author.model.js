import { Schema, model } from "mongoose";

// Defining the Author schema with fields: name, bio, birthDate, and books (reference to Book model)
const authorSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthDate: { type: Date },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]  // Reference to the books written by the author
}, { timestamps: true });  // Enables automatic createdAt and updatedAt fields

const Author = model('Author', authorSchema);

export default Author;
