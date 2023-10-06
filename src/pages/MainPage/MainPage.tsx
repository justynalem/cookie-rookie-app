import { SingleSelectIconList, MultipleSelectIconList } from "../../components";
import { useAi } from "../../hooks";
import { Button, Paper } from "../../ui";
import { Overlay } from "../../components/Overlay/Overlay";
import { useMainPageEffects } from "./MainPage.effects";

import "./MainPage.scss";

export function MainPage() {
  const {
    fridgeOptions,
    kitchenWareOptions,
    addItemInFridgeWithCustom,
    addKitchenwareWithCustom,
    itemsInFridge,
    kitchenware,
    mealType,
    removeItemInFridge,
    removeKitchenware,
    setMealType,
    mealsOptions,
  } = useMainPageEffects();
  const { isError, isLoading, queryRecipe, recipe, clearRecipe } = useAi();

  async function handleQuery() {
    queryRecipe({ itemsInFridge, kitchenware, mealType });
  }

  return (
    <>
      <header className='mainPage__header'>
        <img style={{ height: "120px", width: "auto" }} src='/cookAIlogo.png' />
        <h1 className='mainPage__headerText'>cook-AI</h1>
      </header>
      <Overlay
        isOpen={isLoading}
        text='Your recipe is getting ready 🤌 (it takes around a minute 😊)'
      />
      <div className='scene'>
        <div className='scene__container'>
          <div className={recipe ? "card card__turned" : "card"}>
            <div className='container card__face card__face--front'>
              <div className='scene__inputsHolder'>
                <h3 className='scene__sectionTittle'>meal</h3>
                <SingleSelectIconList
                  onClick={setMealType}
                  value={mealType}
                  options={mealsOptions}
                />
                <h3 className='scene__sectionTittle'>kitchen ware</h3>
                <MultipleSelectIconList
                  values={kitchenware}
                  onAdd={addKitchenwareWithCustom}
                  onRemove={removeKitchenware}
                  options={kitchenWareOptions}
                  custom
                />
                <h3 className='scene__sectionTittle'>items in fridge</h3>
                <MultipleSelectIconList
                  values={itemsInFridge}
                  onAdd={addItemInFridgeWithCustom}
                  onRemove={removeItemInFridge}
                  options={fridgeOptions}
                  custom
                />

                <Button
                  className='btn btn--width50'
                  disabled={
                    itemsInFridge.length < 1 ||
                    kitchenware.length < 1 ||
                    Boolean(!mealType)
                  }
                  onClick={handleQuery}>
                  {isLoading ? "loading...." : "Let the magic happen!"}
                </Button>
              </div>
            </div>
            <div className='container card__face card__face--back'>
              <Paper>
                <span onClick={clearRecipe} className='mainPage__closeBtn'>
                  &times;
                </span>
                <p className='mainPage__recipe'>
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
