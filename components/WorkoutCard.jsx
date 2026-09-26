'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function WorkoutCard({ workout }) {
  const getTags = () => {
    if (Array.isArray(workout?.tags) && workout.tags.length > 0) {
      return workout.tags;
    }
    if (Array.isArray(workout?.categories) && workout.categories.length > 0) {
      return workout.categories;
    }

    const rawCategory = workout?.muscle_group || workout?.category || workout?.target || workout?.type;
    if (typeof rawCategory === 'string' && rawCategory.trim() !== '') {
      return rawCategory.split(',').map((item) => item.trim());
    }

    const name = (workout?.name || '').toLowerCase();
    if (name.includes('bench press')) return ['CHEST', 'ARMS'];
    if (name.includes('pull-up') || name.includes('pull up')) return ['BACK', 'ARMS'];
    if (name.includes('squat')) return ['LEGS', 'CORE'];
    if (name.includes('overhead press')) return ['SHOULDERS', 'ARMS'];
    if (name.includes('bicep') || name.includes('curl')) return ['ARMS'];
    if (name.includes('plank')) return ['CORE'];
    if (name.includes('burpee')) return ['FULL BODY', 'CARDIO'];
    if (name.includes('deadlift')) return ['BACK', 'LEGS'];
    if (name.includes('push-up') || name.includes('push up')) return ['CHEST', 'ARMS'];
    if (name.includes('lunge')) return ['LEGS', 'GLUTES'];
    if (name.includes('twist') || name.includes('russian')) return ['CORE', 'ABS'];
    if (name.includes('kettlebell') || name.includes('swing')) return ['FULL BODY', 'POSTERIOR'];

    return ['GENERAL'];
  };

  const getCalories = () => {
    const val = workout?.calories_burned || workout?.calories || workout?.caloriesBurned;
    if (val && Number(val) > 0) return val;

    const name = (workout?.name || '').toLowerCase();
    if (name.includes('bench press')) return 180;
    if (name.includes('pull-up')) return 120;
    if (name.includes('squat')) return 240;
    if (name.includes('overhead press')) return 150;
    if (name.includes('bicep')) return 80;
    if (name.includes('plank')) return 60;
    if (name.includes('burpee')) return 210;
    if (name.includes('deadlift')) return 220;
    if (name.includes('push-up')) return 110;
    if (name.includes('lunge')) return 140;
    if (name.includes('twist')) return 90;
    if (name.includes('kettlebell')) return 190;

    return 150;
  };

  const tags = getTags();
  const calories = getCalories();

  return (
    <Link
      href={`/fitlog/${workout?.id}`}
      className="block bg-[#13161c] border border-gray-800/80 rounded-2xl overflow-hidden group hover:border-gray-700 transition-all cursor-pointer h-full"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
            <Image
              src={workout?.image || '/banner.png'}
              alt={workout?.name || 'Workout'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-bold text-white uppercase font-oswald tracking-wide group-hover:text-[#ccff00] transition-colors">
              {workout?.name}
            </h3>

            <p className="text-xs text-gray-400">
              {workout?.equipment || 'Barbell, Bench'}
            </p>
          </div>
        </div>

        <div className="px-5 pb-5 pt-2">
          <div className="flex items-center gap-4 text-xs text-gray-400 pt-3 border-t border-gray-800/60">
            <span>⏱️ {workout?.duration_minutes || workout?.duration || 25} min</span>
            <span className="text-[#ccff00]">
              🔥 {calories} kcal
            </span>
            <span>⭐ {workout?.rating || 4.8}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}