// app/signin/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUser } from '@/features/auth/authActions';
import { useAppDispatch } from '@/hooks/redux';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      try {
        const resultAction = await dispatch(
          loginUser({ email: username, password: 'Admin@123' })
        ).unwrap();

        // Login was successful
        console.log('Login success:', resultAction); // {success: true, user: {}}
        router.push('/dashboard');
      } catch (error) {
        // Login failed
        console.error('Login failed:', error);
        alert(
          typeof error === 'string' ? error :
            'An unexpected error occurred'
        );
      }
    }
  };


  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSignIn} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;