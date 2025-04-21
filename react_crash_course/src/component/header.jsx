import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">MealSearch</h1>
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-yellow-400 font-bold'
              : 'text-white hover:text-blue-400 transition'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/ingredients"
          className={({ isActive }) =>
            isActive
              ? 'text-yellow-400 font-bold'
              : 'text-white hover:text-blue-400 transition'
          }
        >
          Ingredients
        </NavLink>
      </div>
    </nav>
  );
}
