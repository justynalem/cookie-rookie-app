import { useCallback, KeyboardEvent } from "react";

export const useHandleKeyDown = () => {
  const handleKeyDown = useCallback(
    (handler: (value: string) => boolean) =>
      (event: KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        if (event.key === "Enter") {
          const isItemAdded = handler(value);
          if (isItemAdded) {
            (event.target as HTMLInputElement).value = "";
          }
        }
      },
    []
  );
  return handleKeyDown;
};
