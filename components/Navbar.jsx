'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <nav className="bg-[#090b0d] border-b border-gray-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo Icon + Brand Title */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="FITLOG Logo"
              width={24}
              height={24}
              className="object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="font-black text-xl text-white tracking-wider uppercase">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-xs font-bold uppercase transition-colors ${
              pathname === '/' ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-xs font-bold uppercase transition-colors ${
              pathname === '/my-plan' ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan?tab=plan"
            className="bg-[#13161c] border border-gray-800 text-xs font-semibold text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-2 hover:border-gray-700 transition-colors"
          >
            <span>Plan:</span>
            <span className="bg-[#ccff00] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="bg-[#13161c] border border-gray-800 text-xs font-semibold text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-2 hover:border-gray-700 transition-colors"
          >
            <span>Saved:</span>
            <span className="bg-[#ccff00] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}