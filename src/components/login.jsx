import React, { useState } from "react";
import firebaseApp from "./firebase"; // Import firebaseApp
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import auth functions
import { Link } from "react-router-dom"; // Import Link for navigation
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate(); // Get navigate function for redirection

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp); // Get authentication instance

    try {
      await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
      // Redirect the user to the main app upon successful login
      navigateTo("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-white">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-900"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-900"
      />
      <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
        Login
      </button>
      <div className="text-center mt-2">
        <p className="text-white">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
