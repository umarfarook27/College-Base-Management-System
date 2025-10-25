import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [marks, setMarks] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [activeTab, setActiveTab] = useState('marks');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                setError('Please login again');
                setLoading(false);
                return;
            }

            try {
                // Configure axios defaults
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                // Get user data
                const userResponse = await axios.get(`http://localhost:5001/api/students/${userId}`);
                setUserData(userResponse.data);

                // Get marks and attendance
                const [marksRes, attendanceRes] = await Promise.all([
                    axios.get(`http://localhost:5001/api/marks/student/${userId}`),
                    axios.get(`http://localhost:5001/api/attendance/student/${userId}`)
                ]);

                // Set data (empty arrays if no data)
                setMarks(marksRes.data || []);
                setAttendance(attendanceRes.data || []);
                setLoading(false);
            } catch (err) {
                console.error('Dashboard Error:', err.response || err);
                if (err.response?.status === 401) {
                    setError('Session expired. Please login again');
                } else if (err.response?.status === 404) {
                    setError('Student data not found');
                } else {
                    setError('Unable to load dashboard. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="loading-spinner"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="alert alert-danger"
                >
                    {error}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="student-dashboard">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="dashboard-header"
            >
                <h1>Welcome, {userData?.name}</h1>
                <p>Student ID: {userData?.studentId}</p>
            </motion.div>

            <div className="dashboard-nav">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`nav-btn ${activeTab === 'marks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('marks')}
                >
                    Marks
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`nav-btn ${activeTab === 'attendance' ? 'active' : ''}`}
                    onClick={() => setActiveTab('attendance')}
                >
                    Attendance
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'marks' ? (
                        <div className="marks-container">
                            {marks.length > 0 ? (
                                marks.map((mark, index) => (
                                    <motion.div
                                        key={mark._id}
                                        className="mark-card"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <h3>{mark.subject}</h3>
                                        <p className="marks">{mark.marks}</p>
                                        <p className="semester">Semester {mark.semester}</p>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="no-data">No marks available</div>
                            )}
                        </div>
                    ) : (
                        <div className="attendance-container">
                            {attendance.length > 0 ? (
                                attendance.map((record, index) => (
                                    <motion.div
                                        key={record._id}
                                        className={`attendance-card ${record.status}`}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <h3>{record.subject}</h3>
                                        <p className="status">{record.status}</p>
                                        <p className="date">
                                            {new Date(record.date).toLocaleDateString()}
                                        </p>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="no-data">No attendance records available</div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StudentDashboard;