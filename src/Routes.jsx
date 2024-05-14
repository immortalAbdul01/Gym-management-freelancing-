// Import necessary dependencies
import React from 'react';
import {
	BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

// Import components
import App from './App';
import Login from './components/login';

// Define routes
const Links = () => {
  return (
    <Router>
		  <Routes
		  >
        {/* Define your routes here */}
        <Route exact path="/" element={<App/>} />
        <Route path="/login" element={<Login/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default Links;
