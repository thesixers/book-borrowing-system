import mongoose from "mongoose";

const borrowingRecordSchema = new mongoose.Schema({
  request_id: { type: String, required: true },
  userRegno: { type: String, required: true },
  bookIsbn: { type: String, required: true },
  borrow_date: { type: String},
  due_date: { type: String},
  return_date: { type: String},
  status: { type: String, enum: ['not borrowed','borrowed', 'returned', 'overdue'], default: 'not borrowed' }
});

const BorrowingRec = mongoose.model('BorrowingRecord', borrowingRecordSchema);
export default BorrowingRec;
