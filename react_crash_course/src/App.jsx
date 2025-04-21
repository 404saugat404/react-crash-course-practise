import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './views/home';
import Indigridents from './views/indigridents';
import MealDetails from './component/mealdetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients" element={<Indigridents />} />
        <Route path="/meal/:idMeal" element={<MealDetailsWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper to fetch meal details based on the route parameter
function MealDetailsWrapper() {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate(); // Add navigate hook

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lookup.php?i=${idMeal}`);
        const data = await response.json();
        if (data.meals) {
          setMeal(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchMealDetails();
  }, [idMeal]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  return <MealDetails meal={meal} onClose={() => navigate(-1)} />; // Navigate back on close
}

export default App;