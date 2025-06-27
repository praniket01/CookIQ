import { createContext, useContext, useState } from "react";


const caloriesContext = createContext();

export const CaloriesProvider = ({children}) => {
const [userCalories,setUserCalories] = useState({});

return(
    <caloriesContext.Provider value={{userCalories,setUserCalories}}>
        {children}
    </caloriesContext.Provider>
)
}
export const useCalorieContext = () => useContext(caloriesContext);