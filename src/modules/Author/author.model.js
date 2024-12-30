import mongoose from 'mongoose';

// Author schema definition
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true });

// Author model based on the schema
const Author = mongoose.model('Author', authorSchema);

export default Author;
