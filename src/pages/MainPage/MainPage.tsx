import { SingleSelectIconList, MultipleSelectIconList } from "../../components";
import { useAi } from "../../hooks";
import { Button, Paper } from "../../ui";
import { Overlay } from "../../components/Overlay/Overlay";
import { useMainPageEffects } from "./MainPage.effects";
import { Recipe } from "../../components/Recipe/Recipe";
import clsx from "clsx";
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
        <img className='mainPage__headerLogo' src='/cookAIlogo.png' />
        <h1 className='mainPage__headerText'>cook-AI</h1>
      </header>
      <Overlay
        isOpen={isLoading}
        text='Your recipe is getting ready 🤌 (it takes around a minute 😊)'
      />
      <div className='mainPage__scene'>
        <div className='mainPage__sceneContainer'>
          <div className={recipe ? "card card__turned" : "card"}>
            <div
              className={clsx(
                "card__face card__face--front",
                Boolean(recipe) && "card__hidden"
              )}>
              <div className='mainPage__inputsHolder'>
                <h3 className='mainPage__sectionTittle'>meal</h3>
                <SingleSelectIconList
                  onClick={setMealType}
                  value={mealType}
                  options={mealsOptions}
                />
                <h3 className='mainPage__sectionTittle'>kitchen ware</h3>
                <MultipleSelectIconList
                  values={kitchenware}
                  onAdd={addKitchenwareWithCustom}
                  onRemove={removeKitchenware}
                  options={kitchenWareOptions}
                  custom
                />
                <h3 className='mainPage__sectionTittle'>items in fridge</h3>
                <MultipleSelectIconList
                  values={itemsInFridge}
                  onAdd={addItemInFridgeWithCustom}
                  onRemove={removeItemInFridge}
                  options={fridgeOptions}
                  custom
                />
                <div className='mainPage__btnWrapper'>
                  <Button
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
            </div>
            <div
              className={clsx(
                "card__face card__face--back",
                Boolean(recipe) && "card__visible"
              )}>
              <Paper>
                <span onClick={clearRecipe} className='mainPage__closeBtn'>
                  &times;
                </span>
                <p className='mainPage__recipe'>
                  {isError ? (
                    "Something went wrong please try again letter"
                  ) : !recipe ? null : (
                    <Recipe
                      title={recipe.title}
                      ingredients={recipe.ingredients}
                      description={recipe.description}
                      instructions={recipe.instructions}
                    />
                  )}
                </p>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
