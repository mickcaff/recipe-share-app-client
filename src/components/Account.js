import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Page from "./Page";
import { UseGlobalContext } from "./utils/context";

function Account() {
  const { currentUser, setCurrentUser } = UseGlobalContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: "",
    lastName: "",
  });
  const isUserSignedIn = Object.keys(currentUser).length !== 0;
  const userSignUpDate = new Date(currentUser.date).getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserSignedIn) {
      // navigate("/signin");
    }
  });

  const handleSignOut = () => {
    setCurrentUser({});
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const handleChange = () => {};

  const updateUser = async (e) => {
    e.preventDefault();
    try {
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
    } catch (e) {
      console.log(e);
    }
  };

  const AccountForm = () => {
    return (
      <div className="account-form-div account-show-form">
        <form className="account-update-form">
          <button className="account-exit-button"><i class="fa-solid fa-xl fa-xmark"></i></button>
          <h1>Update Your Details</h1>
          <hr />
          <label>First Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="firstName"
            value={updatedDetails.firstName}
          />
          <label>Last Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="lastName"
            value={updatedDetails.lastName}
          />
          <button className="account-save-button" onClick={updateUser}>
            Save Updated Details <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button className="account-delete-button" onClick={deleteUser}>
            Delete Account <i class="fa-solid fa-xmark"></i>
          </button>
        </form>
      </div>
    );
  };

  const UserAccountWelcome = () => {
    return (
      <div className="account-div">
        <div className="account-title-text">
          <div>
            <h1>
              Hi there, {currentUser.firstName} {currentUser.lastName}!
            </h1>
            <p>Thanks for using RecipePro since {userSignUpDate}</p>
          </div>
          <button onClick={handleSignOut}>
            Sign out <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
        <div className="account-update-div">
          <h2>
            <i class="fa-solid fa-envelope"></i> {currentUser.email}
          </h2>
          <button onClick={openForm}>Update details</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <AccountForm />
      <Page title="Your Account">
        <main className="account-main">
          {isUserSignedIn && <UserAccountWelcome />}
        </main>
      </Page>
    </>
  );
}

export default Account;
