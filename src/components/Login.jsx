/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { set, useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
      <div className="w-full max-w-lg bg-white rounded-xl p-10 shadow-md">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setError('')}>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ || "email address nust be a valid address" })}
              />
              {errors.email && errors.email.type === 'required' && (
                <p className="mt-2 text-sm text-red-600">Email is required</p>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <p className="mt-2 text-sm text-red-600">Please enter a valid email address</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('password', { required: true, minLength: 8 })}
              />
              {errors.password && errors.password.type === 'required' && (
                <p className="mt-2 text-sm text-red-600">Password is required</p>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <p className="mt-2 text-sm text-red-600">Password must be at least 8 characters</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign in
          </Button>

          <div className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;