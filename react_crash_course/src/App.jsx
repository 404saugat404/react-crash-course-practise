import { useState } from 'react';
import './App.css';
import Card from './component/cards';
import Layout from './layout/layout';
import SearchForm from './component/searchform';

function App() {
  const allMeals = [
    {
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      image: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
    },
    {
      title: "Margherita Pizza",
      description: "A simple yet delicious pizza topped with fresh tomatoes, mozzarella, and basil.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Pizza-Margarita.jpg",
    },
    {
      title: "Caesar Salad",
      description: "A fresh salad with romaine lettuce, croutons, parmesan, and Caesar dressing.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Caesar_salad_%28cropped%29.jpg",
    },
    {
      title: "Tiramisu",
      description: "A classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tiramisu_-_Ristorante_Marco_Polo%2C_Szczecin.jpg",
    },
  ];

  const [meals, setMeals] = useState(allMeals);

  const handleSearch = (query) => {
    const filteredMeals = allMeals.filter((meal) =>
      meal.title.toLowerCase().includes(query.toLowerCase())
    );
    setMeals(filteredMeals);
  };

  return (
    <Layout>
      <div className="p-4 flex justify-end">
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        {meals.map((meal, index) => (
          <Card key={index} title={meal.title} description={meal.description} image={meal.image} />
        ))}
      </div>
    </Layout>
  );
}

export default App;