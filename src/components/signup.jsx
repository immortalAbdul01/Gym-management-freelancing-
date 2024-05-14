import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "./firebase"; // Import firebaseApp
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import auth functions

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const auth = getAuth(firebaseApp); // Get authentication instance

    try {
      await createUserWithEmailAndPassword(auth, email, password); // Create user with email and password
    } catch (error) {
     alert( error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-white">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full px-4 py-2 mb-4 rounded-md bg-black text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full px-4 py-2 mb-4 rounded-md bg-black text-white"
      />
      <button onClick={handleSignUp} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
        Sign Up
      </button>
      <div className="text-center mt-2">
        <p className="text-white">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
