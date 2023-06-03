import { useState } from "react";
import { ChipsList, Select } from "../../components";
import { useItems, useHandleKeyDown } from "../../hooks";
import { Button, Input, Paper } from "../../ui";
import { Meal } from "../../types";

import "./MainPage.scss";

export function MainPage() {
  const [meals, addMeal, removeMeal] = useItems();
  const [itemsInFridge, addItem, removeItem] = useItems();
  const [kitchenware, addKitchenware, removeKitchenware] = useItems();
  const [mealType, setMealType] = useState("");
  const handleKeyDown = useHandleKeyDown()

  return (
    <div className='container'>
      <header className='mainPage__header'>
        <h1 className='mainPage__headerText'>cook-AI</h1>
      </header>
      <div className='mainPage__container'>
        <div className='mainPage__itemsContainer'>
          <Paper>
            <ChipsList items={meals} onDelete={removeMeal} />
            <Input
              placeholder='Go-to meals'
              onKeyDown={handleKeyDown(addMeal)}
            />
          </Paper>
        </div>
        <div className='mainPage__itemsContainer'>
          <Paper>
            <ChipsList items={itemsInFridge} onDelete={removeItem} />
            <Input
              placeholder='Items stored in the fridge'
              onKeyDown={handleKeyDown(addItem)}
            />
          </Paper>
        </div>
        <div className='mainPage__itemsContainer'>
          <Paper>
            <ChipsList items={kitchenware} onDelete={removeKitchenware} />
            <Input
              placeholder='Kitchenware'
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
            placeholder='Select meal type'
          />
          <div className='mainPage__buttonContainer'>
            <Button
              disabled={
                meals.length < 1 ||
                itemsInFridge.length < 1 ||
                kitchenware.length < 1 ||
                Boolean(!mealType)
              }
              onClick={() => null}>
              Let the magic happen!
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}
