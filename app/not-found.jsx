import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-gray-400 text-sm max-w-md mb-6">
        Oops! The workout page or route you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold px-6 py-3 rounded-lg text-sm transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}