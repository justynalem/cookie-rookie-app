import { onRequest } from "firebase-functions/v2/https";
import { ChatGPTAPI } from "chatgpt";
import cors from "cors";

type Body = {
  meals: string[];
  itemsInFridge: string[];
  kitchenware: string[];
  mealType: string;
};

export const getMeal = onRequest(
  { timeoutSeconds: 540 },
  async (request, response) =>
    cors({ origin: "https://cook-ai.netlify.app" })(request, response, async () => {
      if (!process.env.ACCESS_TOKEN) {
        response.sendStatus(500);
        return;
      }
      if (request.method !== "POST") {
        response.sendStatus(404);
      }

      const body: Body = request.body;

      const api = new ChatGPTAPI({
        apiKey: process.env.ACCESS_TOKEN,
      });

      const prompt = `Can you propose a meal similar to ${body.meals.join(", ")}
      i have in my fridge this items ${body.itemsInFridge.join(", ")} 
      also I have this kitchenware ${body.kitchenware.join(", ")} 
      and it needs to be a ${body.mealType}`;

      const { text } = await api.sendMessage(prompt);

      response.send({ text });
    })
);
