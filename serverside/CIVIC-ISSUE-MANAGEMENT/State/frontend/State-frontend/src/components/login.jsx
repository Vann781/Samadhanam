import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
const Login = () => {
  const UserNameRef = React.useRef(); 
  const passwordRef = React.useRef();
  const navigate = useNavigate();

  const submitHandler = async(e) => { 
    e.preventDefault();
    const enteredUserName = UserNameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    console.log(enteredUserName, enteredPassword);
    UserNameRef.current.value = "";
    passwordRef.current.value = "";

    try {
      const {data} = await axios.post("http://localhost:4005" + "/State/login", {enteredUserName,enteredPassword});
       if (data.success) {
         toast.success('Login successful!');
        //  localStorage.setItem("State login token", response.tokens);
         const id = data.user.state_id;
         navigate(`Home/${id}`);
       } else {
         toast.error('Login failed. Please try again.');
       }

    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/4/47/Telangana_Secretariat.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl p-8 w-full max-w-md flex flex-col gap-6 text-white">
        <h2 className="text-3xl font-semibold text-center tracking-wide">STATE LOGIN</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            UserName
          </label>
          <input
            type="text"
            id="text"
            name="text"
            ref={UserNameRef}
            className="w-full px-4 py-2 border border-white/20 rounded-lg bg-white/5 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="email"
            placeholder="you@state.gov"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            ref={passwordRef}
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-white/20 rounded-lg bg-white/5 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700/90 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors"
          onClick={submitHandler}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center"
//       style={{
//         backgroundImage:
//           "url('https://upload.wikimedia.org/wikipedia/commons/4/47/Telangana_Secretariat.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <form className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl p-8 w-full max-w-md flex flex-col gap-6 text-white">
//         <h2 className="text-3xl font-semibold text-center tracking-wide">STATE LOGIN</h2>
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium mb-1">
//             UserName
//           </label>
//           <input
//             type="text"
//             id="text"
//             name="text"
//             ref={UserNameRef}
//             className="w-full px-4 py-2 border border-white/20 rounded-lg bg-white/5 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//             autoComplete="email"
//             placeholder="you@state.gov"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             ref={passwordRef}
//             id="password"
//             name="password"
//             className="w-full px-4 py-2 border border-white/20 rounded-lg bg-white/5 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//             autoComplete="current-password"
//             placeholder="••••••••"
//           />
//         </div>
        
//         <button
//           type="submit"
//           className="w-full bg-blue-700/90 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors"
//           onClick={submitHandler}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Login