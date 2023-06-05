import { useState, useCallback } from "react";

export function useAi() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [recipe, setRecipe] = useState("");

  const queryRecipe = useCallback(
    async ({
      itemsInFridge,
      mealType,
      meals,
      kitchenware,
    }: {
      meals: string[];
      itemsInFridge: string[];
      kitchenware: string[];
      mealType: string;
    }) => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "http://127.0.0.1:5001/cook-ai-8a3e3/us-central/getMeal",
          {
            body: JSON.stringify({
              meals,
              itemsInFridge,
              kitchenware,
              mealType,
            }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { text } = await res.json();
        setRecipe(text);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsError, setIsLoading, setRecipe]
  );

  const clearRecipe = useCallback(() => {
    setRecipe("");
  }, [setRecipe]);

  return {
    isLoading,
    isError,
    recipe,
    queryRecipe,
    clearRecipe,
  };
}
