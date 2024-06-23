import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg md:w-1/3">
        <h3 className="text-2xl font-bold text-center">Sign Up</h3>
        <form onSubmit={handleSubmit(signUp)} className="mt-6">
          {/* Email */}
          <div className="mb-6">
          <div className="mb-6">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Name
              </label>
            </div>
            <Input
              type="text"
              id="password"
              placeholder="Enter your Name"
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("name", {required:true})}
              
            />
          </div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Email
              </label>
          <Input
                type="email"
                name="email"
                id="email"
              placeholder="Enter your Email"
                autoComplete="email"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ || "email address nust be a valid address" })}
              />
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <Input
                type="password"
                name="password"
                id="password"
              placeholder="Enter your password"

                autoComplete="current-password"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('password', { required: true, minLength: 8 })}
              />
          </div>
          {/* Error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {/* Submit Button */}
          <div className="mt-4">
            <Button type="submit" className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Create Account
            </Button>
          </div>
          {/* Login Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;