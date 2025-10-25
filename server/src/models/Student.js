const mongoose = require('mongoose');

const MarksSchema = new mongoose.Schema({
  subject: String,
  score: Number
}, { _id: false });

const AttendanceSchema = new mongoose.Schema({
  date: Date,
  present: Boolean
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  program: String,
  marks: [MarksSchema],
  attendance: [AttendanceSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);