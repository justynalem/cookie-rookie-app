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
        setIsError(false);
        const res = await fetch(
          "https://getmeal-otp52gktdq-uc.a.run.app",
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
