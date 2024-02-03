import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';
import logoImage from '../assets/images/logo.png';

function HomePage() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchRecipes = async (query) => {
        const appId = process.env.REACT_APP_APP_ID;
        const appKey = process.env.REACT_APP_APP_KEY;
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=${appId}&app_key=${appKey}`;

        setIsLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecipes(data.hits);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchRecipes(searchTerm);
    };

    const navigateToRecipeDetail = (recipe) => {
        navigate('/recipe-detail', { state: { recipe } });
    };

    useEffect(() => {
        fetchRecipes('defaultTerm'); // Replace 'defaultTerm' with a term of your choice for initial load
    }, []);

    return (
        <>
            <div className="homepage">
                <nav className="navbar">
                    <Link to="/" className="logo">
                        <img src={logoImage} alt="Logo" />
                        <span>Your Website Name</span>
                    </Link>
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
                    <p>Welcome to our cozy retreat where flavors blossom and memories are crafted with care. Embark on a gastronomic journey where each recipe is a celebration of vibrant ingredients and culinary expression. Delight in the tradition of sharing and savor the joy that comes from creating and tasting. Your next favorite recipe awaits!</p>
                </section>

                <section className="featured-recipes">
                    <div className="recipes-container">
                        {isLoading ? <p>Loading recipes...</p> : recipes.map((recipe, index) => (
                            <div 
                                className="recipe-card" 
                                key={index} 
                                onClick={() => navigateToRecipeDetail(recipe.recipe)}
                            >
                                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                                <h3>{recipe.recipe.label}</h3>
                                <p>{recipe.recipe.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <footer>
                <p>Copyright@2024</p>
            </footer>
        </>
    );
}

export default HomePage;
