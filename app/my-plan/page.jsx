'use client';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import toast from 'react-hot-toast';

function MyPlanContent() {
  const { plan, saved, removeFromPlan, removeFromSaved, addToSaved } = usePlan();
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState('plan'); 
  const [sortBy, setSortBy] = useState('duration');

  useEffect(() => {
    if (tabQuery === 'saved') {
      setActiveTab('saved');
    } else if (tabQuery === 'plan') {
      setActiveTab('plan');
    }
  }, [tabQuery]);

  const baseList = activeTab === 'plan' ? plan : saved;

  const parseNumber = (val) => {
    if (val === undefined || val === null) return 0;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const parsed = parseFloat(val.replace(/[^\d.]/g, ''));
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const getDuration = (item) => {
    const dur = parseNumber(item?.duration_minutes ?? item?.durationMinutes ?? item?.duration ?? item?.time);
    return dur > 0 ? dur : 25;
  };

  const getCalories = (item) => {
    const val = parseNumber(item?.calories_burned ?? item?.caloriesBurned ?? item?.calories ?? item?.cal);
    if (val > 0) return val;

    const name = (item?.name || '').toLowerCase();
    if (name.includes('bench press')) return 180;
    if (name.includes('pull-up') || name.includes('pull up')) return 120;
    if (name.includes('squat')) return 240;
    if (name.includes('overhead press')) return 150;
    if (name.includes('bicep') || name.includes('curl')) return 80;
    if (name.includes('plank')) return 60;
    if (name.includes('burpee')) return 210;
    if (name.includes('deadlift')) return 220;
    if (name.includes('push-up') || name.includes('push up')) return 110;
    if (name.includes('lunge')) return 140;
    if (name.includes('twist') || name.includes('russian')) return 90;
    if (name.includes('kettlebell') || name.includes('swing')) return 190;

    return 150;
  };

  const getRating = (item) => {
    const rat = parseNumber(item?.rating ?? item?.stars);
    return rat > 0 ? rat : 4.8;
  };

  const currentList = [...baseList].sort((a, b) => {
    if (sortBy === 'duration') {
      return getDuration(b) - getDuration(a);
    }
    if (sortBy === 'calories') {
      return getCalories(b) - getCalories(a);
    }
    if (sortBy === 'rating') {
      return getRating(b) - getRating(a);
    }
    return 0;
  });

  const totalDuration = baseList.reduce((acc, item) => acc + getDuration(item), 0);
  const totalCalories = baseList.reduce((acc, item) => acc + getCalories(item), 0);

  const handleMarkAsDone = (item) => {
    addToSaved(item, true);
    removeFromPlan(item.id);
    toast.dismiss();
    toast.success('Marked as completed!');
  };

  const handleRemove = (item) => {
    toast.dismiss();
    if (activeTab === 'plan') {
      removeFromPlan(item.id);
      toast.error(`${item.name || 'Workout'} removed from Today's Plan!`);
    } else {
      removeFromSaved(item.id);
      toast.error(`${item.name || 'Workout'} removed from Saved!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white">MY PLAN</h1>
        <p className="text-sm text-gray-400 mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#13161c] border border-gray-800 rounded-2xl p-6">
          <span className="text-sm font-semibold text-gray-400 block mb-2">Exercises</span>
          <span className="text-5xl font-black text-[#ccff00]">{baseList.length}</span>
        </div>
        <div className="bg-[#13161c] border border-gray-800 rounded-2xl p-6">
          <span className="text-sm font-semibold text-gray-400 block mb-2">Minutes</span>
          <span className="text-5xl font-black text-white">{totalDuration}</span>
        </div>
        <div className="bg-[#13161c] border border-gray-800 rounded-2xl p-6">
          <span className="text-sm font-semibold text-gray-400 block mb-2">Calories</span>
          <span className="text-5xl font-black text-white">{totalCalories}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 mb-8 pb-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab('plan')}
            className={`pb-3 px-6 text-sm font-bold transition-colors cursor-pointer relative ${
              activeTab === 'plan' ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'
            }`}
          >
             ({plan.length})
            {activeTab === 'plan' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00]"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-6 text-sm font-bold transition-colors cursor-pointer relative ${
              activeTab === 'saved' ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved Workouts ({saved.length})
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ccff00]"></span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto mb-2 sm:mb-0">
          <span className="text-xs text-gray-400 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#13161c] border border-gray-800 text-white text-xs font-semibold rounded-xl px-4 py-2 pr-8 hover:border-gray-700 focus:outline-none focus:border-[#ccff00] cursor-pointer transition-colors"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {currentList.length === 0 ? (
        <div className="bg-[#13161c]/40 border border-dashed border-gray-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
          <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-sm max-w-md mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#ccff00]/10 cursor-pointer"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {currentList.map((item) => {
            const displayMins = getDuration(item);
            const displayCals = getCalories(item);
            const displayRating = getRating(item);

            return (
              <div
                key={item.id}
                className="bg-[#13161c] border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:border-gray-700 transition-colors"
              >
                <div className="flex gap-6 items-center flex-grow">
                  <div className="relative w-28 h-20 rounded-xl bg-gray-900 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || '/banner.png'}
                      alt={item.name || 'Workout'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white uppercase group-hover:text-[#ccff00] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-400">{item.muscle_group || item.muscleGroup || 'General'}</p>
                    <div className="flex gap-4 text-xs text-gray-400 pt-1">
                      <span>⏱️ {displayMins} min</span>
                      <span className="text-[#ccff00]">🔥 {displayCals} kcal</span>
                      <span>⭐ {displayRating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                  <Link
                    href={`/fitlog/${item.id}`}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-2.5 px-6 rounded-full transition-colors cursor-pointer"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => handleMarkAsDone(item)}
                      className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs py-2.5 px-6 rounded-full transition-colors cursor-pointer"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item)}
                    className="text-gray-600 hover:text-red-400 text-lg transition-colors p-2 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}