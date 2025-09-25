"use client";


import React, { useEffect } from 'react'

import { useActionState } from 'react';
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';
import { login } from './actions';



export function LoginForm() {
    const [state, loginAction] = useActionState(login, undefined);
   

 

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20'>
        <form action={loginAction}>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Login
          </h2>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='border rounded w-full py-2 px-3'
              autoComplete='email'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='border rounded w-full py-2 px-3'
              autoComplete='password'
              required
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='bg-[#004080] text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Login
            </button>

 
          </div>
        </form>
      </div>
    </div>
  );

}

