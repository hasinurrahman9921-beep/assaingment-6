'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${resolvedParams.id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error('Error fetching workout details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Workout Not Found</h2>
        <Link href="/" className="text-[#ccff00] hover:underline">
          ← Back to Library
        </Link>
      </div>
    );
  }

  const tags = workout.tags || (workout.muscle_group ? [workout.muscle_group] : ['General']);

  const instructionsList = Array.isArray(workout.instructions)
    ? workout.instructions
    : typeof workout.instructions === 'string'
    ? workout.instructions.split(/(?:\r?\n|\. )+/).filter((step: string) => step.trim().length > 0)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
          <Image
            src={workout.image || '/banner.png'}
            alt={workout.name || 'Workout Image'}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {workout.name}
            </h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              {workout.description || 'A compound exercise designed to build strength and endurance effectively.'}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-[#ccff00] text-black font-bold text-xs px-3 py-1 rounded-full uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-b border-gray-800/80 divide-y divide-gray-800/60 text-xs sm:text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">Equipment</span>
              <span className="text-white font-medium">{workout.equipment || 'Barbell, Bench'}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">Difficulty</span>
              <span className="text-white font-medium">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">Sets</span>
              <span className="text-white font-medium">{workout.sets || 4}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">Reps</span>
              <span className="text-white font-medium">{workout.reps || '6-8'}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">Duration</span>
              <span className="text-white font-medium">{workout.duration_minutes || workout.duration || 25} min</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">Calories</span>
              <span className="text-white font-medium">{workout.calories_burned || workout.calories || 180} kcal</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">Rating</span>
              <span className="text-white font-medium">{workout.rating || 4.8}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Instructions</h3>
            {instructionsList.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {instructionsList.map((step: string, idx: number) => (
                  <li key={idx} className="pl-1">
                    {step.replace(/^\d+\.\s*/, '')}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-gray-400">No specific instructions provided for this workout.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => addToPlan(workout)}
              className="flex-1 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📂</span> Add to today's plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex-1 bg-[#13161c] hover:bg-gray-800 text-white border border-gray-700 font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🔖</span> Save for later
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}