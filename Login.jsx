import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Login.css';
import Input from "./Input";
import {
  signinAuthUserWithEmailAndPassword,
  // Import the auth object from Firebase
  // Example: import { auth } from './utils/firebase';
} from "./utils/firebase";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [contact, setContact] = useState({
    email: "",
    password: "",
  });
  const { email, password } = contact;

  useEffect(() => {
    // Replace this with the appropriate Firebase authentication check
    // Example: const unsubscribe = auth.onAuthStateChanged((user) => {
    //   setUser(user);
    // });

    // For demonstration purposes, let's assume the user is not logged in initially
    setUser(null);
  }, []);

  async function handleClick(event) {
    try {
      if (!email || !password) {
        alert("ENTER YOUR EMAIL AND PASSWORD");
        return;
      }

      const response = await signinAuthUserWithEmailAndPassword(email, password);
      console.log(response);

      if (!response) {
        alert("INVALID EMAIL OR PASSWORD");
        return;
      }

      setUser(response); // Set the user object when logged in

      // Add an alert for successful login
      alert("Login Successful");

    } catch (error) {
      alert("ERROR IN LOGIN: " + error.message);
    }
  }

  async function handleSignOut() {
    try {
      // Use the Firebase sign-out method here
      // Example: await auth.signOut();
      setUser(null); // Set the user object to null when logged out
      navigate('/');
      alert("Sign Out Successful"); // Show a success message
    } catch (error) {
      alert("Error in sign out: " + error.message);
    }
  }

  function handlePass(event) {
    const value = event.target.value;
    const name = event.target.name;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="border">
      <div className="header">
        <Link to="/signup" className="SignLink">
          <h3 className="signup">Sign up</h3>
        </Link>

        <div className="mail"><h2>Your email</h2></div>
        <Input
          name="email"
          type="email"
          onChange={handlePass}
        />
        <br></br>
        <div className="mail"><h2>Your password</h2></div>
        <Input
          name="password"
          type="password"
          onChange={handlePass}
        />
        <br></br>

        {user ? ( // Render "Sign Out" button if the user is logged in
          <>
            <button className="button2" onClick={handleSignOut}>
              Sign Out
            </button>
            {/* Add other components or content here after login */}
          </>
        ) : ( // Render "Login" button if the user is not logged in
          <button className="button1" onClick={handleClick}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
