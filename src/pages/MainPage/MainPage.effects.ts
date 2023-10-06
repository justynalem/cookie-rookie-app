import { useState } from "react";
import { defaultFridgeItems, defaultKitchenItems, meals } from "./MainPage.const";
import { useItems } from "../../hooks";

export const useMainPageEffects = () => {
  const [fridgeOptions, setFridgeOptions] = useState(defaultFridgeItems);
  const [kitchenWareOptions, setKitchenWareOptions] = useState(defaultKitchenItems);
  const [itemsInFridge, addItemInFridge, removeItemInFridge] = useItems();
  const [kitchenware, addKitchenware, removeKitchenware] = useItems();
  const [mealType, setMealType] = useState("");


  const addFridgeOption = (custom: string) => {
    setFridgeOptions(prev => [...prev, { type: custom, icon: "./fridge.svg" }]);
  };
  const addKitchenwareOption = (custom: string) => {
    setKitchenWareOptions(prev => [...prev, { type: custom, icon: "./kitchenWare.svg" }]);
  };

  const addItemInFridgeWithCustom = (type: string) => {
    const lowerCaseType = type.toLowerCase();
    if (!fridgeOptions.some(option => option.type === lowerCaseType)) {
      addFridgeOption(lowerCaseType);
    }
    addItemInFridge(lowerCaseType);
  };

  const addKitchenwareWithCustom = (type: string) => {
    const lowerCaseType = type.toLowerCase();
    if (!kitchenWareOptions.some(option => option.type === lowerCaseType)) {
      addKitchenwareOption(lowerCaseType);
    }
    addKitchenware(lowerCaseType);
  };

  return {
    fridgeOptions,
    kitchenWareOptions,
    itemsInFridge,
    kitchenware,
    mealType,
    mealsOptions: meals,
    addItemInFridgeWithCustom,
    removeItemInFridge,
    addKitchenwareWithCustom,
    removeKitchenware,
    setMealType,
  };
};