const express = require('express');
const router = express.Router();
const { auth, staffOnly } = require('../middleware/auth');
const User = require('../models/User');

// Get all students (staff only)
router.get('/list', [auth, staffOnly], async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('-password')
            .sort({ name: 1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single student
router.get('/:id', auth, async (req, res) => {
    try {
        const student = await User.findById(req.params.id).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;