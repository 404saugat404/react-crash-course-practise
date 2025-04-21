import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Card from '../component/cards';
import Layout from '../layout/layout';
import MealDetails from '../component/mealdetails';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [noMealsFound, setNoMealsFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 20; // Define items per page

  const fetchRandomMeals = async () => {
    setLoading(true);
    try {
      const randomMeals = [];
      for (let i = 0; i < 10; i++) { // Fetch 10 random meals
        const response = await fetch(`${API_BASE_URL}/random.php`);
        const data = await response.json();
        if (data.meals) {
          randomMeals.push(data.meals[0]);
        }
      }
      setMeals(randomMeals);
    } catch (error) {
      console.error('Error fetching random meals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
      const data = await response.json();

      if (data.meals) {
        setMeals(data.meals); // Store all results
        setNoMealsFound(false);
        setCurrentPage(1); // Reset to the first page
      } else {
        setNoMealsFound(true);
        fetchRandomMeals(); // Fetch random meals if no search results
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (meal) => {
    navigate(`/meal/${meal.idMeal}`);
  };

  const handleCloseDetails = () => {
    setSelectedMeal(null);
  };

  const displayedMeals = meals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Calculate meals for the current page

  const totalPages = Math.ceil(meals.length / itemsPerPage); // Calculate total pages

  return (
    <Layout onSearch={handleSearch}>
      {loading && (
        <div className="text-center text-blue-500 font-bold mt-4">
          Loading, please wait...
        </div>
      )}
      {noMealsFound && !loading && (
        <div className="text-center text-red-500 font-bold mt-4">
          No meals found. Showing random meals instead.
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        {!loading &&
          displayedMeals.map((meal, index) => (
            <div key={index} onClick={() => handleMealClick(meal)}>
              <Card
                title={meal.strMeal}
                description={meal.strInstructions}
                image={meal.strMealThumb}
              />
            </div>
          ))}
      </div>
      {!loading && meals.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      {selectedMeal && (
        <MealDetails meal={selectedMeal} onClose={handleCloseDetails} />
      )}
    </Layout>
  );
}
