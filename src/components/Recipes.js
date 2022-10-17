import axios from "axios";
import React, { useEffect, useState } from "react";
import { UseGlobalContext } from "./utils/context";
import { NavLink, useNavigate } from "react-router-dom";

function Recipes() {
  const navigate = useNavigate();
  const { currentUser } = UseGlobalContext();
  const { firstName } = currentUser;
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState(recipes);
  const [searchBar, setSearchBar] = useState("");

  const getRecipes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5500/api/recipes?public=true"
      );
      setRecipes(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const filterRecipes = () => {
    return recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(searchBar);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    setSearchedRecipes(filterRecipes());
  }, [searchBar]);

  return (
    <main className="recipes-main">
      <div className="recipes-title-div">
        <div className="recipes-title-text">
          <h1>Community Recipes</h1>
          <p>
            Please enjoy this collection of recipes made public by each other.
          </p>
        </div>
      </div>
      <div className="recipes-search-div">
        <input
          type="text"
          placeholder="Search Recipes"
          name="searchBar"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <i class="fa-solid fa-lg fa-magnifying-glass"></i>
      </div>
      <div className="recipe-grid-div">
        {searchedRecipes.map((recipe) => {
          return (
            <div className="recipe-individual" onClick={()=>navigate(`/${recipe._id}`)}>
              <h3>{recipe.title}</h3>
              <h4>Servings: {recipe.serves}</h4>
              <h4>Categories: {recipe.categories}</h4>
              <ul>
                {recipe.ingredients.map((item) => {
                  return (
                    <li>
                      {item.amount} {item.unit} {item.ingredient}
                    </li>
                  );
                })}
              </ul>
              {recipe.method.map((item) => {
                return <div>{item.step}</div>;
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Recipes;
