import React, { useRef } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { endpoints } from '../config/api';

const Login = () => {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const passwordRef = useRef();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    
    // Basic validation
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }
    
    userNameRef.current.value = "";
    passwordRef.current.value = "";
    
    try {
      const { data } = await axios.post(endpoints.municipal.login, {
        username, 
        password
      });
      
      console.log("Login response:", data);
      
      if (data.success === true) {
        // Store the token
        localStorage.setItem("Admin login token", data.token);
        
        // Optional: Store refresh token
        if (data.refreshToken) {
          localStorage.setItem("Admin refresh token", data.refreshToken);
        }
        
        toast.success("Login successful!");
        
        const id = data.user.district_id;
        navigate(`/District/${id}`);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        // Request made but no response
        toast.error("Cannot connect to server. Please try again.");
      } else {
        // Other errors
        toast.error("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,25,41,0.65), rgba(10,25,41,0.65)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNdp0yPT1Um4YJlLZ20Hh8RdlcmBejvPXHQA&s')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <form className="backdrop-blur-md bg-white/6 border border-white/10 rounded-xl text-white font-semibold p-8 w-full max-w-md flex flex-col gap-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center">Municipal Login</h2>
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            UserName
          </label>
          <input
            type="text"
            id="username"
            name="username"
            ref={userNameRef}
            className="w-full px-4 py-2 border border-white/20 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            className="w-full px-4 py-2 border border-white/20 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;
