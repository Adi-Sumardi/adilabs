'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-5xl">⚠️</span>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold mb-4">Something Went Wrong</h2>
        <p className="text-muted mb-8">
          We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault!
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg text-left">
            <p className="font-mono text-sm text-red-800 dark:text-red-300">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-white dark:bg-slate-800 text-foreground font-bold rounded-full border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
