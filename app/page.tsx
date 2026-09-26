'use client';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import WorkoutCard from '@/components/WorkoutCard';

interface Workout {
  id: string | number;
  name?: string;
  duration_minutes?: number;
  duration?: number;
  calories_burned?: number;
  calories?: number;
  caloriesBurned?: number;
  rating?: number | string;
  [key: string]: any;
}

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch('https://api.api-store.workers.dev/api/fitlog');
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const getWorkoutDuration = (workout: Workout) => {
    const duration = workout?.duration_minutes || workout?.duration;
    return Number(duration) || 25;
  };

  const getWorkoutCalories = (workout: Workout) => {
    const val = workout?.calories_burned || workout?.calories || workout?.caloriesBurned;
    if (val && Number(val) > 0) return Number(val);

    const name = (workout?.name || '').toLowerCase();
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

  const sortedWorkouts = [...workouts].sort((a: Workout, b: Workout) => {
    if (sortBy === 'duration') {
      return getWorkoutDuration(b) - getWorkoutDuration(a);
    }
    if (sortBy === 'calories') {
      return getWorkoutCalories(b) - getWorkoutCalories(a);
    }
    if (sortBy === 'rating') {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0;
  });

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white uppercase font-oswald tracking-wide">
              THE LIBRARY
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#13161c] border border-gray-800 text-white text-xs font-semibold rounded-xl px-4 py-2 hover:border-gray-700 focus:outline-none focus:border-[#ccff00] cursor-pointer transition-colors"
            >
              <option value="default">Default</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout: Workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}