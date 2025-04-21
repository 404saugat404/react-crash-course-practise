import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../component/cards';
import Layout from '../layout/layout';
import MealDetails from '../component/mealdetails';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Indigridents() {
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/list.php?i=list`);
        const data = await response.json();
        if (data.meals) {
          setIngredients(data.meals);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const fetchMealsByIngredient = async (ingredient) => {
    setMeals([]); // Reset meals to ensure it always directs to ingredients
    setLoading(true);
    navigate(`/ingredients?ingredient=${ingredient}`); // Update URL with ingredient
    try {
      const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient}`);
      const data = await response.json();
      if (data.meals) {
        const detailedMeals = await Promise.all(
          data.meals.map(async (meal) => {
            const detailResponse = await fetch(`${API_BASE_URL}/lookup.php?i=${meal.idMeal}`);
            const detailData = await detailResponse.json();
            return detailData.meals[0];
          })
        );
        setMeals(detailedMeals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (meal) => {
    navigate(`/meal/${meal.idMeal}`); // Navigate to meal details route
  };

  const handleCloseDetails = () => {
    setSelectedMeal(null); // Reset the selected meal
    navigate('/'); // Navigate back to the home page
  };

  return (
    <Layout>
      {loading && (
        <div className="text-center text-blue-500 font-bold mt-4">
          Loading, please wait...
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        {!loading && meals.length === 0 && (
          ingredients.map((ingredient, index) => (
            <div
              key={index}
              onClick={() => fetchMealsByIngredient(ingredient.strIngredient)}
              className="cursor-pointer bg-white dark:bg-gray-800 p-4 m-2 rounded-md shadow-md transition hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {ingredient.strIngredient}
              </h2>
            </div>
          ))
        )}
        {!loading && meals.length > 0 && (
          meals.map((meal, index) => (
            <div
              key={index}
              onClick={() => handleMealClick(meal)}
              className="cursor-pointer transition"
            >
              <Card
                title={meal.strMeal}
                image={meal.strMealThumb}
                description={meal.strInstructions || 'No description available.'}
              />
            </div>
          ))
        )}
      </div>
      {selectedMeal && (
        <MealDetails meal={selectedMeal} onClose={handleCloseDetails} />
      )}
    </Layout>
  );
}
