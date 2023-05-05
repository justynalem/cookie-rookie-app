import { ChipsList } from "../../components";
import { useCookieRookie, InputNames, Meal } from "../../hooks";
import { Button, Input } from "../../ui";
import "./MainPage.scss";

const REQUEST_URL = "/api/1683300463483-2049510388169";

export function MainPage() {
  const { handleKeyDown, handleOnChange, handleRemove, items } =
    useCookieRookie();

  const handleOnClick = async () => {
    const { itemsInFridge, kitchenware, meals, order } = items;

    const body = {
      itemsInFridge,
      kitchenware,
      meals,
      order,
    };

    try {
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
    } catch (err) {
      console.error(err);
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
          onDelete={handleRemove(InputNames.FridgeItems)}
        />
        <Input
          value={items.newItemsInFridge}
          name={InputNames.FridgeItems}
          placeholder='Items stored in the fridge'
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />

        <ChipsList
          items={items.kitchenware}
          onDelete={handleRemove(InputNames.Kitchenware)}
        />
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
          <Button
            disabled={
              items.meals.length < 1 ||
              items.itemsInFridge.length < 1 ||
              items.kitchenware.length < 1 ||
              ![Meal.breakfast, Meal.dinner].includes(items.order)
            }
            onClick={handleOnClick}>
            Create recipe
          </Button>
        </div>
      </div>
    </>
  );
}
