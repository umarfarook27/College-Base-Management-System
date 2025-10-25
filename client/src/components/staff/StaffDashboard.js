import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './StaffDashboard.css';

const StaffDashboard = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        subject: '',
        marks: '',
        semester: '',
        attendance: 'present',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            // Updated endpoint from /all to /list
            const response = await axios.get('http://localhost:5001/api/students/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError(err.response?.data?.message || 'Error loading students');
            setLoading(false);
        }
    };

    const handleUpdateMarks = async (e) => {
        e.preventDefault();
        if (!selectedStudent) {
            alert('Please select a student first');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const payload = {
                subject: formData.subject,
                marks: parseInt(formData.marks),
                semester: parseInt(formData.semester)
            };

            const response = await axios.post(
                `http://localhost:5001/api/marks/${selectedStudent._id}`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data) {
                alert('Marks updated successfully!');
                // Clear form
                setFormData(prev => ({
                    ...prev,
                    subject: '',
                    marks: '',
                    semester: ''
                }));
            }
        } catch (err) {
            console.error('Update marks error:', err);
            alert(err.response?.data?.message || 'Error updating marks');
        }
    };

    const handleUpdateAttendance = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5001/api/attendance/${selectedStudent._id}`,
                {
                    date: formData.date,
                    status: formData.attendance,
                    subject: formData.subject
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert('Attendance marked successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error marking attendance');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="staff-dashboard">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="dashboard-title"
            >
                Staff Dashboard
            </motion.h1>

            <div className="dashboard-container">
                <motion.div 
                    className="students-list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2>Students</h2>
                    {students.map((student) => (
                        <motion.div
                            key={student._id}
                            className={`student-card ${selectedStudent?._id === student._id ? 'selected' : ''}`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedStudent(student)}
                        >
                            <h3>{student.name}</h3>
                            <p>{student.studentId}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {selectedStudent && (
                    <motion.div 
                        className="forms-container"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2>Update Records for {selectedStudent.name}</h2>
                        
                        <form onSubmit={handleUpdateMarks} className="marks-form">
                            <h3>Update Marks</h3>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Marks"
                                    min="0"
                                    max="100"
                                    value={formData.marks}
                                    onChange={(e) => setFormData({...formData, marks: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Semester"
                                    min="1"
                                    max="8"
                                    value={formData.semester}
                                    onChange={(e) => setFormData({...formData, semester: e.target.value})}
                                    required
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                            >
                                Update Marks
                            </motion.button>
                        </form>

                        <form onSubmit={handleUpdateAttendance} className="attendance-form">
                            <h3>Mark Attendance</h3>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                required
                            />
                            <select
                                value={formData.attendance}
                                onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                                required
                            >
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                required
                            />
                            <button type="submit">Mark Attendance</button>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default StaffDashboard;