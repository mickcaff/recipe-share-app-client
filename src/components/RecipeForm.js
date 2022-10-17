import React from "react";
import { NavLink } from "react-router-dom";

function RecipeForm(props) {
  const {
    currentUser,
    recipeToBeUpdated,
    formData,
    handleChange,
    handleIngredientChange,
    removeIngredientInputs,
    addIngredientInputs,
    handleMethodChange,
    removeMethodInput,
    addMethodInput,
    handlePublicChange,
    updateData,
    saveData,
  } = props;

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
            <label>Category</label>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={(event) => handleChange(event)}
            />
            <label>Serves</label>
            <input
              type="text"
              placeholder="Servings"
              name="serves"
              value={formData.serves}
              onChange={(event) => handleChange(event)}
            />
            <label>Description</label>
            <textarea
              cols="50"
              rows="3"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(event) => handleChange(event)}
            ></textarea>
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
            <label>Notes</label>
            <textarea
              cols="50"
              rows="5"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={(event) => handleChange(event)}
            ></textarea>
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

export default RecipeForm;
