import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div 
      className="text-center py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="display-4 mb-4">Welcome to College Base Management System</h1>
      <p className="lead mb-4">
        Access your academic records and manage student information efficiently
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn btn-outline-primary">
          Register
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;