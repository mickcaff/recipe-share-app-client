import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "./utils/context";
import RecipeForm from "./RecipeForm";
import { initialFormState } from "./data/initialRecipeFormData";

function AddRecipe() {
  const navigate = useNavigate();

  const { currentUser } = UseGlobalContext();

  const [formData, setFormData] = useState(initialFormState);

  function handleChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  //Ingredient Form Fields useState Functions
  function handleIngredientChange(index, event) {
    let data = [...formData.ingredients];
    data[index][event.target.name] = event.target.value;
    setFormData((prev) => {
      return {
        ...prev,
        ingredients: data,
      };
    });
  }

  function handleMethodChange(index, event) {
    let data = [...formData.method];
    data[index][event.target.name] = event.target.value;
    setFormData((prev) => {
      return {
        ...prev,
        method: data,
      };
    });
  }

  function handlePublicChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        public: event.target.value,
      };
    });
  }

  function addIngredientInputs(e) {
    e.preventDefault();
    let newIngredientField = { amount: "", unit: "", ingredient: "" };
    setFormData((prev) => {
      return {
        ...prev,
        ingredients: [...formData.ingredients, newIngredientField],
      };
    });
  }

  function removeIngredientInputs(index, event) {
    event.preventDefault();
    let data = [...formData.ingredients];
    data.splice(index, 1);
    setFormData((prev) => {
      return {
        ...prev,
        ingredients: data,
      };
    });
  }

  function addMethodInput(e) {
    e.preventDefault();
    let newMethodField = { step: "" };
    setFormData((prev) => {
      return {
        ...prev,
        method: [...formData.method, newMethodField],
      };
    });
  }

  function removeMethodInput(index, event) {
    event.preventDefault();
    let data = [...formData.method];
    data.splice(index, 1);
    setFormData((prev) => {
      return {
        ...prev,
        method: data,
      };
    });
  }

  // Final Save function
  async function saveData(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/recipe", {
        title: formData.title,
        category: formData.category,
        serves: formData.serves,
        description: formData.description,
        ingredients: formData.ingredients,
        method: formData.method,
        notes: formData.notes,
        public: formData.public,
        user: currentUser._id,
      });
      console.log("Data Saved", res.status, res.data);
      navigate("/recipes");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <RecipeForm
      currentUser={currentUser}
      formData={formData}
      handleChange={handleChange}
      handleIngredientChange={handleIngredientChange}
      removeIngredientInputs={removeIngredientInputs}
      addIngredientInputs={addIngredientInputs}
      handleMethodChange={handleMethodChange}
      removeMethodInput={removeMethodInput}
      addMethodInput={addMethodInput}
      handlePublicChange={handlePublicChange}
      saveData={saveData}
    />
  );
}

export default AddRecipe;
