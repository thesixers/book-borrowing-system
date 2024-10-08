import mongoose from "mongoose";
 
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  published_year: { type: String, required: true },
  total_copies: { type: Number, required: true },
  copies_available: { type: Number, default: 1 },
  fine: {type: Number},
  created_at: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);
export default Book
