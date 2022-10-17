import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//CSS
import "./App.css";
import "./components/Navbar.css"
import "./components/Home.css"
import "./components/Recipes.css"
//Components
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SharedLayout from "./components/SharedLayout";
import Register from "./components/Register";
import Recipes from './components/Recipes';
import IndividualRecipe from './components/IndividualRecipe';
import Account from './components/Account';
import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';
import UserRecipes from './components/UserRecipes';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path=":recipe" element={<IndividualRecipe />} />
            <Route path=":user/myrecipes" element={<UserRecipes />} />
            <Route path="addrecipe" element={<AddRecipe />} />
            <Route path=":recipeToBeUpdated/updaterecipe" element={<UpdateRecipe />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
