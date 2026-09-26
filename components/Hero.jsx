import Image from 'next/image';

export default function Hero() {
  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-[#13161c] border border-gray-800/80 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            <p className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.08] uppercase tracking-tight">
              TRAIN WITH INTENT. LOG <br className="hidden sm:inline" /> EVERY SET.
            </h1>

            <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed font-normal">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            <div className="pt-2">
              <a
                href="#library"
                className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-md"
              >
                BROWSE WORKOUTS
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-md h-[280px] sm:h-[350px]">
              <Image
                src="/banner.png"
                alt="FitLog Hero Illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}