import mongoose from "mongoose";

const borrowRequestSchema = new mongoose.Schema({
  userRegno: { type: String, required: true },
  bookIsbn: { type: String, required: true },
  request_date: { type: String},
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  admin_id: { type: String, default: null },
  decision_date: { type: String}
});

const BorrowReq = mongoose.model('BorrowRequest', borrowRequestSchema);
export default BorrowReq;
 