import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#090b0d] border-t border-gray-800/80 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5">
            <Image
              src="/logo.png"
              alt="FITLOG Logo"
              width={20}
              height={20}
              className="object-contain opacity-80"
            />
          </div>
          <span className="font-bold text-sm text-gray-400 tracking-wider uppercase">
            FITLOG
          </span>
        </div>

        <p className="text-xs text-gray-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}