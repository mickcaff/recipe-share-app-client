import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UseGlobalContext } from "./utils/context";
import { NavLink } from "react-router-dom";

function Recipes() {
  const { currentUser } = UseGlobalContext();
  const { firstName } = currentUser;
  const [recipes, setRecipes] = useState([]);

  const { user } = useParams();

  const getRecipes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/recipes?user=${user}`
      );
      setRecipes(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <main className="recipes-main">
      <NavLink className="nav-page nav-link-text" to="/addrecipe">
        Add Recipe
      </NavLink>
      <h1>{firstName}'s Recipes</h1>
      {recipes.map((recipe) => {
        return (
          <div>
            <h3>{recipe.title}</h3>
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
            <Link to={`/${recipe._id}/updaterecipe`}>Update Recipe</Link>
          </div>
        );
      })}
    </main>
  );
}

export default Recipes;
