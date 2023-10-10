import "./Recipe.scss";

type RecipeProps = {
  title: string;
  ingredients: string[];
  description: string;
  instructions: string[];
};

export const Recipe = ({
  title,
  ingredients,
  description,
  instructions,
}: RecipeProps) => {
  return (
    <div className='recipe__container'>
      <p>{title}</p>
      <p>{description}</p>
      <ul>
        {ingredients.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul>
        {instructions.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
