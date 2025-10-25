const Mark = require('../models/Mark');

exports.updateMarks = async (req, res) => {
    try {
        const { studentId, subject, marks, semester } = req.body;
        const staffId = req.user.staffId; // From auth middleware

        const mark = await Mark.findOneAndUpdate(
            { studentId, subject, semester },
            { marks, updatedBy: staffId },
            { new: true, upsert: true }
        );

        res.json(mark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentMarks = async (req, res) => {
    try {
        const studentId = req.user.studentId; // From auth middleware
        const marks = await Mark.find({ studentId });
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};