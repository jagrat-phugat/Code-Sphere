import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper';

const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();
  
    const submitForm = (e) => {
        e.preventDefault();
        fetch(api_base_url + "/login",{
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: pwd
          })
        }).then(res => res.json()).then(data => {
          if(data.success === true){
            localStorage.setItem("token", data.token);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userId", data.userId);
            setTimeout(() => {
              window.location.href = "/"
            }, 200);
          } else {
            setError(data.message);
          }
        })
    }

  return (
    <>
       <div className="flex flex-col md:flex-row w-screen h-screen bg-gray-100"
       style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4_gLvY-SqG5p2c2FY7S3kQuofOAExEdN7Xw&s')`,
      }}>

      <div className="flex flex-col items-center justify-center bg-black-600 text-white w-full md:w-1/2 p-10">
        <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
        <p className="text-lg mb-4">Don't Have an Account?</p>
        <Link to="/signup">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-600">
            Sign Up
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">Login</h2>
        <form onSubmit={submitForm} className="w-full max-w-md mx-auto space-y-4">

          <div className="flex flex-col">
            <label className="text-gray-200 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>
          <p className='text-red-500 text-[14px] my-2'>{error}</p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
