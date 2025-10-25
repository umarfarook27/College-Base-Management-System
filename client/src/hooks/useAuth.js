import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/user');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            setUser(response.data);
            history.push('/'); // Redirect to home after login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            history.push('/login'); // Redirect to login after logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return { user, loading, login, logout };
};

export default useAuth;