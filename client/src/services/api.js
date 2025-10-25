import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth endpoints
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// Student endpoints
export const fetchStudents = async () => {
    const response = await api.get('/students/all');
    return response.data;
};

// Marks endpoints
export const getStudentMarks = async (studentId) => {
    const response = await api.get(`/marks/${studentId}`);
    return response.data;
};

export const updateMarks = async (studentId, marksData) => {
    const response = await api.post(`/marks/${studentId}`, marksData);
    return response.data;
};

// Attendance endpoints
export const getStudentAttendance = async (studentId) => {
    const response = await api.get(`/attendance/${studentId}`);
    return response.data;
};

export const updateAttendance = async (studentId, attendanceData) => {
    const response = await api.post(`/attendance/${studentId}`, attendanceData);
    return response.data;
};