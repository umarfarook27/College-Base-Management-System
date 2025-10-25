const express = require('express');
const router = express.Router();
const { auth, staffOnly } = require('../middleware/auth');
const Mark = require('../models/Mark');

// Update or create marks for a student (staff only)
router.post('/:studentId', [auth, staffOnly], async (req, res) => {
    try {
        const { subject, marks, semester } = req.body;
        const updatedMark = await Mark.findOneAndUpdate(
            { 
                studentId: req.params.studentId,
                subject: subject,
                semester: semester
            },
            {
                $set: {
                    marks: marks,
                    updatedBy: req.user._id
                }
            },
            { new: true, upsert: true }
        );
        
        res.json(updatedMark);
    } catch (error) {
        console.error('Marks update error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get marks for a specific student
router.get('/student/:id', auth, async (req, res) => {
    try {
        const marks = await Mark.find({ studentId: req.params.id })
            .sort({ semester: 1, subject: 1 });
        
        if (!marks.length) {
            return res.status(200).json([]); // Return empty array instead of 404
        }
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;