import React, { useRef } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    userNameRef.current.value = "";
    passwordRef.current.value = "";
    try {
          const {data} = await axios.post("http://localhost:4040" + "/municipalities/login", {username, password});
          console.log(data.success, data.tokens);
          if(data.success === true){
               localStorage.setItem("Admin login token", data.tokens);
               const id = data.user.district_id;
               navigate(`/District/${id}`);
          }
          else{
            toast.error("Login failed");
          }
    } 
    catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,25,41,0.65), rgba(10,25,41,0.65)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <form className="backdrop-blur-md bg-white/6 border border-white/10 rounded-xl text-white font-semibold p-8 w-full max-w-md flex flex-col gap-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center">Municipal Login</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            ref={userNameRef}
            className="w-full px-4 py-2 border border-white/20 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            autoComplete="email"
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
