import React, { useEffect, useState } from 'react';
import StudentList from '../components/StudentList';

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch('/api/students');
            const data = await response.json();
            setStudents(data);
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Student Management</h1>
            <StudentList students={students} />
        </div>
    );
};

export default Students;