import { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";

interface CookieRookieState {
  meals: string[];
  itemsInFridge: string[];
  kitchenware: string[];
  newMeal: string;
  newItemsInFridge: string;
  newKitchenware: string;
  order: Meal;
}

export enum Meal {
  breakfast = "breakfast",
  dinner = "dinner",
}

export enum InputNames {
  Meal = "newMeal",
  FridgeItems = "newItemsInFridge",
  Kitchenware = "newKitchenware",
  Order = "order",
}

const LOCAL_STORAGE_KEY = "cookie_rookie_items";

export function useCookieRookie() {
  const [items, setItems] = useState<CookieRookieState>({
    meals: [],
    itemsInFridge: [],
    kitchenware: [],
    newMeal: "",
    newItemsInFridge: "",
    newKitchenware: "",
    order: "",
    ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"),
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd(event);
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setItems({ ...items, [name]: value });
  };

  const handleAdd = (event: KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    const trimmedValue = value?.trim();

    if (!trimmedValue) {
      return;
    }

    if (name === InputNames.Meal && !items.meals.includes(trimmedValue)) {
      setItems(prevItems => ({
        ...prevItems,
        meals: [...prevItems.meals, trimmedValue],
        newMeal: "",
      }));
    } else if (
      name === InputNames.FridgeItems &&
      !items.itemsInFridge.includes(trimmedValue)
    ) {
      setItems(prevItems => ({
        ...prevItems,
        itemsInFridge: [...prevItems.itemsInFridge, trimmedValue],
        newItemsInFridge: "",
      }));
    } else if (
      name === InputNames.Kitchenware &&
      !items.kitchenware.includes(trimmedValue)
    ) {
      setItems(prevItems => ({
        ...prevItems,
        kitchenware: [...prevItems.kitchenware, trimmedValue],
        newKitchenware: "",
      }));
    }
  };

  const handleRemove = (inputName: string) => (item: string) => {
    if (inputName === InputNames.Meal && item) {
      setItems(prevItems => ({
        ...prevItems,
        meals: prevItems.meals.filter(meal => meal !== item),
      }));
    }

    if (inputName === InputNames.FridgeItems && item) {
      setItems(prevItems => ({
        ...prevItems,
        itemsInFridge: prevItems.itemsInFridge.filter(
          fridgeItem => fridgeItem !== item
        ),
      }));
    }

    if (inputName === InputNames.Kitchenware && item) {
      setItems(prevItems => ({
        ...prevItems,
        kitchenware: prevItems.kitchenware.filter(
          kitchenItem => kitchenItem !== item
        ),
      }));
    }
  };

  return {
    items,
    handleKeyDown,
    handleOnChange,
    handleRemove,
  };
}
