import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) throw new Error("ERROR:Could not fetch the data...");
        const meals = await response.json();
        setLoadedMeals(meals);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
