import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";
import Error from "./UI/Error";

const requestConfig = {};

export default function Meals() {

  const {data : loadedMeals, error, isLoading} = useHttp("http://localhost:3000/meals", requestConfig, []);
  


  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await fetch("http://localhost:3000/meals");
  //       if (!response.ok) throw new Error("ERROR:Could not fetch the data...");
  //       const meals = await response.json();
  //       setLoadedMeals(meals);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getData();
  // }, []);

  if(isLoading){
    return <p className="center">Fetching Meals ...</p>
  }

  if(error){
    return <Error title="Failed to fetch the meals" message={error.message || "Some error occured try again later..."} />
  }
  // if(!data){
  //   return <p>No meals found...</p>
  // }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
