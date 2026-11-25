import { useId, useState } from "react";
import "./DishSelector.css";

export type SelectableDish = {
  id: string;
  name: string;
  total_minutes?: number;
};

export type DishSelectorProps = {
  dishes: readonly SelectableDish[];
  selectedIds: readonly string[];
  onSelectionChange: (ids: string[]) => void;
};

const maxDishes = 3;

export function DishSelector({
  dishes,
  selectedIds,
  onSelectionChange,
}: DishSelectorProps) {
  const [search, setSearch] = useState("");
  const searchId = useId();
  const hintId = useId();
  const query = search.trim().toLocaleLowerCase("ru");
  const visibleDishes = dishes.filter(({ name }) =>
    name.toLocaleLowerCase("ru").includes(query),
  );
  const selected = new Set(selectedIds);

  function updateSelection(id: string, checked: boolean) {
    if (!checked) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else if (!selected.has(id) && selected.size < maxDishes) {
      onSelectionChange([...selectedIds, id]);
    }
  }

  return (
    <fieldset className="dish-selector" aria-describedby={hintId}>
      <legend>Блюда для ужина</legend>
      <p className="dish-selector__hint" id={hintId}>
        Выберите 2–3 блюда.
      </p>

      <label htmlFor={searchId}>Поиск по названию</label>
      <input
        className="dish-selector__search"
        id={searchId}
        type="search"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />

      <p className="dish-selector__hint" role="status">
        Выбрано {selected.size} из {maxDishes}
      </p>
      {visibleDishes.length > 0 ? (
        <ul className="dish-selector__list">
          {visibleDishes.map((dish) => {
            const checked = selected.has(dish.id);

            return (
              <li key={dish.id}>
                <label className="dish-selector__option">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={!checked && selected.size >= maxDishes}
                    onChange={(event) =>
                      updateSelection(dish.id, event.currentTarget.checked)
                    }
                  />
                  <span>{dish.name}</span>
                  {dish.total_minutes !== undefined && (
                    <span className="dish-selector__time">
                      {dish.total_minutes} мин
                    </span>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="dish-selector__hint" role="status">
          {dishes.length === 0
            ? "В каталоге пока нет блюд."
            : "Блюда не найдены."}
        </p>
      )}
    </fieldset>
  );
}
