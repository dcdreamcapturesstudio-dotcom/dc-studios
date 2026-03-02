'use client'

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../actions/auth';

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(login, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/admin');
    }
  }, [state, router]);

  return (
    <div className="min-h-screen min-w-screen absolute top-0 left-0 bg-neutral-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-neutral-900 rounded-lg border border-neutral-800 shadow-2xl">
        <h1 className="text-3xl font-serif text-white mb-2 text-center">Admin Login</h1>
        <p className="text-neutral-400 text-center mb-8 font-display">Sign in to manage the gallery.</p>
        
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-md mb-6">
            {state.error}
          </div>
        )}
        
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              placeholder="dc@gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
