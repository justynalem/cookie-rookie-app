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
      <img className='recipe__img' src='/recipe.svg' />
      <p className='recipe__title'>{title}</p>
      <p className='recipe__description'>{description}</p>
      <hr className='recipe__divider' />
      <p className='recipe__smallTitle'>ingredients:</p>

      <ul className='recipe__list'>
        {ingredients.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <hr className='recipe__divider' />
      <p className='recipe__smallTitle'>instructions:</p>
      <ul className='recipe__list'>
        {instructions.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
