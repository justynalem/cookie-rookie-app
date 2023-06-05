import { useState } from "react";
import { ChipsList, InputWithButton, Select } from "../../components";
import { useItems, useHandleKeyDown, useAi } from "../../hooks";
import { Button, Paper } from "../../ui";
import { Meal } from "../../types";

import "./MainPage.scss";
import { Overlay } from "../../components/Overlay/Overlay";

export function MainPage() {
  const [meals, addMeal, removeMeal] = useItems();
  const [itemsInFridge, addItem, removeItem] = useItems();
  const [kitchenware, addKitchenware, removeKitchenware] = useItems();
  const [mealType, setMealType] = useState("");
  const handleKeyDown = useHandleKeyDown();
  const { isError, isLoading, queryRecipe, recipe, clearRecipe } = useAi();

  async function handleQuery() {
    queryRecipe({ itemsInFridge, kitchenware, meals, mealType });
  }

  return (
    <>
      <header className="mainPage__header">
        <h1 className="mainPage__headerText">cook-AI</h1>
      </header>
      <div className="scene">
        <Overlay
          isOpen={isLoading}
          text="Your recipe is getting ready 🤌 (it takes around a minute 😊)"
        />
        <div className={recipe ? "card card__turned" : "card"}>
          <div className="container card__face card__face--front">
            <div className="mainPage__container">
              <div className="mainPage__itemsContainer">
                <Paper>
                  <ChipsList items={meals} onDelete={removeMeal} />
                  <InputWithButton
                    onClick={(value) => {
                      return addMeal(value);
                    }}
                    placeholder="Go-to meals"
                    onKeyDown={handleKeyDown(addMeal)}
                  />
                </Paper>
              </div>
              <div className="mainPage__itemsContainer">
                <Paper>
                  <ChipsList items={itemsInFridge} onDelete={removeItem} />
                  <InputWithButton
                    onClick={(value) => {
                      return addItem(value);
                    }}
                    placeholder="Items stored in the fridge"
                    onKeyDown={handleKeyDown(addItem)}
                  />
                </Paper>
              </div>
              <div className="mainPage__itemsContainer">
                <Paper>
                  <ChipsList items={kitchenware} onDelete={removeKitchenware} />
                  <InputWithButton
                    onClick={(value) => {
                      return addKitchenware(value);
                    }}
                    placeholder="Kitchenware"
                    onKeyDown={handleKeyDown(addKitchenware)}
                  />
                </Paper>
              </div>
              <Paper>
                <Select
                  options={Object.entries(Meal).map(([key, value]) => ({
                    value: value,
                    label: key,
                  }))}
                  onChange={setMealType}
                  placeholder="Select meal type"
                />
                <div className="mainPage__buttonContainer">
                  <Button
                    disabled={
                      meals.length < 1 ||
                      itemsInFridge.length < 1 ||
                      kitchenware.length < 1 ||
                      Boolean(!mealType)
                    }
                    onClick={handleQuery}
                  >
                    {isLoading ? "loading...." : "Let the magic happen!"}
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
          <div className="container card__face card__face--back">
            <div className="mainPage__container ">
              <Paper>
                <span onClick={clearRecipe} className="mainPage__closeBtn">
                  {" "}
                  &times;
                </span>
                <p className="mainPage__recipe">
                  {isError
                    ? "Something went wrong please try again letter"
                    : recipe}
                </p>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
