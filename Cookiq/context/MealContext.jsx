import { createContext, useContext, useState } from 'react';

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  const addMeal = (newMeal) => {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };

  const removeMeal = (mealtitle) => {
    setMeals((prevMeals) => prevMeals.filter(m => m.title !== mealtitle));
  };

  return (
    <MealContext.Provider value={{ meals, setMeals, addMeal, removeMeal }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);
