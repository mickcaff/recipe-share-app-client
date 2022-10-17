import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseGlobalContext } from "./utils/context";
import { NavLink } from "react-router-dom";

function AddRecipe() {
  const navigate = useNavigate();

  const { currentUser } = UseGlobalContext();
  const user = currentUser._id;

  const { recipeToBeUpdated } = useParams();

  const initialFormState = {
    title: "",
    ingredients: [{ amount: "", unit: "", ingredient: "" }],
    method: [{ step: "" }],
    public: false,
    user: currentUser._id,
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (recipeToBeUpdated) {
      getData();
    }
  }, []);

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

  async function getData(e) {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/recipe/${recipeToBeUpdated}`
      );
      setFormData(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  // Final Save function
  async function saveData(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/recipe", {
        title: formData.title,
        ingredients: formData.ingredients,
        method: formData.method,
        public: formData.public,
        user: formData.user,
      });
      console.log("Data Saved", res.status, res.data);
      navigate("/recipes");
    } catch (e) {
      console.log(e);
    }
  }

  async function updateData(e) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/recipe/${recipeToBeUpdated}`,
        {
          title: formData.title,
          ingredients: formData.ingredients,
          method: formData.method,
          public: formData.public,
          user: formData.user,
        }
      );
      console.log("Data Updated", res.status, res.data);
      setFormData(initialFormState);
      navigate(`/${user}/myrecipes`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="add-main">
      {!currentUser.firstName ? (
        <>
          <h2>
            Welcome, please sign in to add a recipe.{" "}
            <i className="fa-solid fa-spoon"></i>
          </h2>
          <div className="add-links-div">
            <NavLink className="add-link-text btn" to="/signin">
              Sign In
            </NavLink>
            <NavLink className="add-link-text btn" to="/register">
              Sign Up
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <h1 className="add-title">Add Recipe</h1>
          <form>
            <label>Title</label>
            <input
              type="text"
              placeholder="Recipe Title"
              name="title"
              value={formData.title}
              onChange={(event) => handleChange(event)}
            />
            <h2>Ingredients</h2>
            <div className="add-ingredients-div">
              <div className="add-ingredient-component">
                {formData.ingredients.map((input, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={input.amount}
                        onChange={(event) =>
                          handleIngredientChange(index, event)
                        }
                      />
                      <input
                        type="text"
                        name="unit"
                        placeholder="Unit"
                        value={input.unit}
                        onChange={(event) =>
                          handleIngredientChange(index, event)
                        }
                      />
                      <input
                        type="text"
                        name="ingredient"
                        placeholder="Ingredient"
                        value={input.ingredient}
                        onChange={(event) =>
                          handleIngredientChange(index, event)
                        }
                      />
                      <button
                        onClick={(event) =>
                          removeIngredientInputs(index, event)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <button onClick={addIngredientInputs}>
              Add another ingredient
            </button>
            <h2>Method</h2>
            <div className="add-method-div">
              {formData.method.map((input, index) => {
                return (
                  <div className="add-method-component" key={index}>
                    <textarea
                      cols="50"
                      rows="5"
                      name="step"
                      placeholder=""
                      value={input.step}
                      onChange={(event) => handleMethodChange(index, event)}
                    ></textarea>
                    <button
                      onClick={(event) => removeMethodInput(index, event)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            <button onClick={addMethodInput}>Add next step</button>

            <div className="public-button-div">
              <h4>Would you like to make this recipe public?</h4>

              <label>
                <input
                  type="radio"
                  value={true}
                  checked={formData.public === "true"}
                  onChange={(event) => handlePublicChange(event)}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  value={false}
                  checked={formData.public === "false"}
                  onChange={(event) => handlePublicChange(event)}
                />
                No, keep private
              </label>
            </div>

            {recipeToBeUpdated ? (
              <button onClick={updateData}>Update</button>
            ) : (
              <button onClick={saveData}>Save</button>
            )}
            {/* <button onClick={saveData}>Save</button> */}
          </form>
        </>
      )}
    </main>
  );
}

export default AddRecipe;
