'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const localPlan = localStorage.getItem('fitlog_plan');
    const localSaved = localStorage.getItem('fitlog_saved');
    if (localPlan) setPlan(JSON.parse(localPlan));
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout) => {
    toast.dismiss();

    const existsInPlan = plan.some((item) => String(item.id) === String(workout.id));
    if (existsInPlan) {
      toast.error('Already added to Today\'s Plan!');
      return;
    }

    const existsInSaved = saved.some((item) => String(item.id) === String(workout.id));
    if (existsInSaved) {
      toast.error('Already saved for later!');
      return;
    }

    if (plan.length >= 5) {
      toast.error('Maximum limit of 5 workouts reached for today!');
      return;
    }

    setPlan((prev) => [...prev, workout]);
    toast.success('Added to Today\'s Plan!');
  };

  const addToSaved = (workout, isMoving = false) => {
    toast.dismiss();

    const existsInSaved = saved.some((item) => String(item.id) === String(workout.id));
    if (existsInSaved) {
      toast.error('Already saved for later!');
      return;
    }

    if (!isMoving) {
      const existsInPlan = plan.some((item) => String(item.id) === String(workout.id));
      if (existsInPlan) {
        toast.error('Already added to Today\'s Plan!');
        return;
      }
    }

    setSaved((prev) => [...prev, workout]);
    if (!isMoving) {
      toast.success('Saved for later!');
    }
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        setPlan,
        setSaved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}