import { useState, useCallback } from "react";
const URL = "https://getmeal-otp52gktdq-uc.a.run.app";

type RequestType = {
  itemsInFridge: string[];
  kitchenware: string[];
  mealType: string;
};
type ResponseType = {
  title: string;
  ingredients: string[];
  description: string;
  instructions: string[];
};

export function useAi() {
  const [recipe, setRecipe] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const queryRecipe = async (request: RequestType) => {
    try {
      setIsLoading(true);
      const res = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Request not successful.");
      }
      const recipe: ResponseType = await res.json();
      setIsError(false);
      setRecipe(recipe);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecipe = useCallback(() => {
    setRecipe(null);
  }, [setRecipe]);

  return {
    recipe,
    isLoading,
    isError,
    queryRecipe,
    clearRecipe,

  };
}
