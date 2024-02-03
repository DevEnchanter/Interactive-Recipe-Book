import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecipeDetail.css';

function RecipeDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { recipe } = location.state;

    return (
        <div className="recipe-detail">
            <h2>{recipe.label}</h2>
            <img src={recipe.image} alt={recipe.label} />
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredientLines.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.url ? <a href={recipe.url} target="_blank" rel="noopener noreferrer">Full recipe</a> : 'No detailed instructions available.'}</p>
            <h3>Details</h3>
            <p>Cooking Time: {recipe.totalTime} minutes</p>
            <p>Servings: {recipe.yield}</p>
            {/* Include nutritional information, user ratings, reviews, etc., as available in recipe data */}
            
            <button onClick={() => navigate(-1)}>Back to Recipes</button>
        </div>
    );
}

export default RecipeDetail;
