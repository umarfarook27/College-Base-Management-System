import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="d-flex justify-content-center p-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger m-3" role="alert">
      Error: {error}
    </div>
  );

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {filteredStudents.map(student => (
          <div key={student._id} className="col-md-6 col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">Roll No: {student.roll}</p>
                <p className="card-text">Email: {student.email}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = `/student/${student._id}`}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredStudents.length === 0 && (
        <div className="alert alert-info">
          No students found.
        </div>
      )}
    </div>
  );
};

export default StudentList;