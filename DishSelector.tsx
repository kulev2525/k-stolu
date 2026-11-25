import React, { useMemo, useState } from "react";
import "./DishSelector.css";

export interface Dish {
  id: number;
  name: string;
  description?: string;
  cookingTime?: number;
}

interface DishSelectorProps {
  dishes: Dish[];
  onChange?: (selectedDishes: Dish[]) => void;
}

export default function DishSelector({ dishes, onChange }: DishSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const filteredDishes = useMemo(
    () =>
      dishes.filter((dish) =>
        dish.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [dishes, search],
  );

  const toggleDish = (dish: Dish) => {
    const updatedIds = selectedIds.includes(dish.id)
      ? selectedIds.filter((id) => id !== dish.id)
      : [...selectedIds, dish.id];

    setSelectedIds(updatedIds);
    onChange?.(dishes.filter((item) => updatedIds.includes(item.id)));
  };

  return (
    <section className="dish-selector" aria-labelledby="dish-selector-title">
      <div className="dish-selector__header">
        <h2 id="dish-selector-title">Выберите блюда</h2>
        <span>Выбрано: {selectedIds.length}</span>
      </div>

      <input
        className="dish-selector__search"
        type="search"
        placeholder="Поиск блюд..."
        aria-label="Поиск блюд"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="dish-selector__list">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => {
            const isSelected = selectedIds.includes(dish.id);

            return (
              <label
                key={dish.id}
                className={`dish-card${isSelected ? " dish-card--selected" : ""}`}
              >
                <span className="dish-card__info">
                  <strong>{dish.name}</strong>
                  {dish.description && <span>{dish.description}</span>}
                  {dish.cookingTime != null && (
                    <small>Время приготовления: {dish.cookingTime} мин.</small>
                  )}
                </span>

                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleDish(dish)}
                  aria-label={`Выбрать ${dish.name}`}
                />
              </label>
            );
          })
        ) : (
          <p className="dish-selector__empty">Блюда не найдены</p>
        )}
      </div>
    </section>
  );
}
