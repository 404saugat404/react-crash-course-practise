import { useState } from 'react';
import './App.css';

function App() {
  const meal = {
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    image: "https://via.placeholder.com/300x200", // Replace with your image URL
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{meal.title}</h2>
          <p className="text-gray-600 mt-2">{meal.description}</p>
        </div>
      </div>
    </div>
  );
}

export default App;