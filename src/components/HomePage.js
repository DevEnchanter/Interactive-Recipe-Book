import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';
import logoImage from '../assets/images/logo.png';

function HomePage() {
    let navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRecipes = async (query) => {
        const appId = process.env.REACT_APP_APP_ID;
        const appKey = process.env.REACT_APP_APP_KEY;

        
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(searchTerm)}&app_id=${appId}&app_key=${appKey}`;



        setIsLoading(true);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data.hits); // Assuming 'data.hits' contains the recipes
    } catch (error) {
        console.error('Error fetching recipes:', error);
    } finally {
        setIsLoading(false);
    }
};

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        fetchRecipes(searchTerm);
    };

    const handleAddToFavorites = (recipeId) => {
        // Add logic to update favorites
    };

    useEffect(() => {
        fetchRecipes('defaultTerm'); // Replace 'defaultTerm' with a term of your choice
    }, []); // Empty dependency array for initial load
    

    recipes.map((recipe, index) => (
        <div className="recipe-card" key={index}>
            {/* Recipe content */}
            <button onClick={() => handleAddToFavorites(recipe.recipe.uri)}>
                Add to Favorites
            </button>
        </div>
    ))

    const navigateToMenu = () => {
        navigate('/menu');
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="homepage">
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img src={logoImage} alt="Logo" />
                    <span>Your Website Name</span>
                </Link>
                {/* Navigation items */}
            </nav>

            <section className="hero">
                <h1>Discover Your Next Favorite Recipe</h1>
            </section>

            <section className="search-section">
                <form onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        placeholder="Search for recipes..." 
                    />
                    <button type="submit">Search</button>
                </form>
            </section>

            <section className="about">
                <p>Welcome to our cozy retreat where flavors blossom and memories are crafted with care. Embark on a gastronomic journey where each recipe is a celebration of vibrant ingredients and culinary expression. Delight in the tradition of sharing and savor the joy that comes from creating and tasting. Your next favorite recipe awaits!
</p>
            </section>

            <section className="featured-recipes">
                <h2>Featured Recipes</h2>
                <div className="recipes-container">
                    {recipes.map((recipe, index) => (
                        <div className="recipe-card" key={index}>
                            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                            <h3>{recipe.recipe.label}</h3>
                            <p>{recipe.recipe.description}</p>
                            {/* Recipe details */}
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta">
                <button onClick={navigateToMenu}>See Our Menu</button>
            </section>

            <footer>
                {/* Footer content */}
            </footer>
        </div>
    );
}

export default HomePage;
