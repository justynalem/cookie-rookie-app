import { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { ChipsList } from "../../components";
import { Button, Input } from "../../ui";
import "./MainPage.scss";

enum Meal {
  breakfast = "breakfast",
  dinner = "dinner",
}

enum InputNames {
  Meal = "newMeal",
  FridgeItems = "newItemsInFridge",
  Kitchenware = "newKitchenware",
  Order = 'order'
}

interface CookieRookieState {
  meals: string[];
  itemsInFridge: string[];
  kitchenware: string[];
  newMeal: string;
  newItemsInFridge: string;
  newKitchenware: string;
  order: Meal | "";
}

interface CookieRookieRequestBody {
  meals: string[];
  itemsInFridge: string[];
  kitchenware: string[];
  order: Meal | "";
}

const LOCAL_STORAGE_KEY = "cookie_rookie_items";
const REQUEST_URL = "/api/1683293701191-7758839300367";

export function MainPage() {
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

  const handleOnClick = async () => {
    const { itemsInFridge, kitchenware, meals, order } = items;

    const body: CookieRookieRequestBody = {
      itemsInFridge,
      kitchenware,
      meals,
      order,
    };

    const response = await fetch(REQUEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert("Data sent to server");
    }
  };

  return (
    <>
      <header className='mainPage__header'>
        <h1 className='mainPage__headerText'>cookie rookie</h1>
      </header>
      <div className='mainPage__container'>
        <ChipsList
          items={items.meals}
          onDelete={handleRemove(InputNames.Meal)}
        />
        <Input
          value={items.newMeal}
          name={InputNames.Meal}
          placeholder='Go-to meals'
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />

        <ChipsList
          items={items.itemsInFridge}
          onDelete={handleRemove(InputNames.FridgeItems)}></ChipsList>
        <Input
          value={items.newItemsInFridge}
          name={InputNames.FridgeItems}
          placeholder='Items stored in the fridge'
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />

        <ChipsList
          items={items.kitchenware}
          onDelete={handleRemove(InputNames.Kitchenware)}></ChipsList>

        <Input
          value={items.newKitchenware}
          name={InputNames.Kitchenware}
          placeholder='Kitchenware'
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <h2 className='mainPage__containerText'> Let the magic happen!</h2>
        <Input
          value={items.order}
          name={InputNames.Order}
          placeholder='Enter your wish. A breakfast or dinner?'
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <div className='mainPage__buttonContainer'>
          <Button onClick={handleOnClick}>Create recipe</Button>
        </div>
      </div>
    </>
  );
}
