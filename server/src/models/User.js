const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'staff'], required: true },
    studentId: { type: String, unique: true, sparse: true }, // For students only
    staffId: { type: String, unique: true, sparse: true },   // For staff only
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);