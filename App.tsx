import React, { useState } from "react";
import DishSelector, { Dish } from "./DishSelector";

const dishes: Dish[] = [
  {
    id: 1,
    name: "Борщ",
    description: "Традиционный борщ со сметаной",
    cookingTime: 90,
  },
  {
    id: 2,
    name: "Цезарь",
    description: "Салат с курицей и соусом",
    cookingTime: 30,
  },
  {
    id: 3,
    name: "Паста Карбонара",
    description: "Паста с беконом и сливочным соусом",
    cookingTime: 25,
  },
  {
    id: 4,
    name: "Шарлотка",
    description: "Яблочный пирог",
    cookingTime: 60,
  },
];

export default function App() {
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  return (
    <main style={{ padding: 30 }}>
      <DishSelector dishes={dishes} onChange={setSelectedDishes} />

      <h3>Ваш выбор:</h3>
      {selectedDishes.length > 0 ? (
        <ul>
          {selectedDishes.map((dish) => (
            <li key={dish.id}>{dish.name}</li>
          ))}
        </ul>
      ) : (
        <p>Пока ничего не выбрано.</p>
      )}
    </main>
  );
}
