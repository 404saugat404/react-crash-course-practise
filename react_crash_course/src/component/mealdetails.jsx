import React from 'react';

export default function MealDetails({ meal, onClose }) {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose} // Ensure this calls the passed onClose function
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          Close
        </button>
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          {meal.strMeal}
        </h2>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p>
            <strong>Category:</strong> {meal.strCategory || 'N/A'}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea || 'N/A'}
          </p>
          <p>
            <strong>Tags:</strong> {meal.strTags ? meal.strTags.split(',').join(', ') : 'N/A'}
          </p>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          Instructions:
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {meal.strInstructions}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
              Ingredients:
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {Object.keys(meal)
                .filter((key) => key.startsWith('strIngredient') && meal[key])
                .map((key, index) => (
                  <li key={index}>{meal[key]}</li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
              Measures:
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {Object.keys(meal)
                .filter((key) => key.startsWith('strMeasure') && meal[key])
                .map((key, index) => (
                  <li key={index}>{meal[key]}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              YouTube
            </a>
          )}
          {meal.strSource && (
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              View Original Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
