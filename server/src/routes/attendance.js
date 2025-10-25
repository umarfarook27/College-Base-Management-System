const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Attendance = require('../models/Attendance');

// Get attendance for a specific student
router.get('/student/:id', auth, async (req, res) => {
    try {
        const attendance = await Attendance.find({ studentId: req.params.id })
            .sort({ date: -1 });
        
        if (!attendance.length) {
            return res.status(200).json([]); // Return empty array instead of 404
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;