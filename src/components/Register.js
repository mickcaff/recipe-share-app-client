import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseGlobalContext } from "./utils/context";
import Page from "./Page";

function Register() {
  const {setCurrentUser} = UseGlobalContext()
  const [userRegistration, setUserRegistation] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserRegistation((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const navigate = useNavigate();

  async function addUser(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user`, {
        email: userRegistration.email,
        firstName: userRegistration.firstName,
        lastName: userRegistration.lastName,
        password: userRegistration.password,
      });
      console.log(res);
      setUserRegistation({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      });
      setCurrentUser(userRegistration);
      navigate("/recipes");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Page title="Register">
      <main className="register-main">
        <div className="register-div">
          <div className="register-content-div">
            <h1 className="nav-title-heading">
              <i className="fa-solid fa-spoon"></i> RecipeShare
            </h1>
            <h1 className="heading-register">Create your account</h1>
            <form className="register-form">
              <label>Email Address</label>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                value={userRegistration.email}
              />
              <label>First Name</label>
              <input
                type="text"
                onChange={handleChange}
                name="firstName"
                value={userRegistration.firstName}
              />
              <label>Last Name</label>
              <input
                type="text"
                onChange={handleChange}
                name="lastName"
                value={userRegistration.lastName}
              />
              <label>Password</label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                value={userRegistration.password}
              />
              <div className="register-checkbox-div">
                <input className="register-checkbox" type="checkbox" />
                <p>
                  I accept the{" "}
                  <Link className="register-policy-link" to="/privacypolicy">
                    Privacy Policy
                  </Link>{" "}
                  and the{" "}
                  <Link className="register-policy-link" to="terms">
                    Terms of Service
                  </Link>
                </p>
              </div>
              <div className="register-form-btn-div">
                <button onClick={addUser}>Sign Up</button>
                <p>
                  Already have an account?{" "}
                  <Link className="register-login-link" to="/signin">
                    Log in now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="register-background-div">
          {/* <h1>The cooking social network</h1> */}
        </div>
      </main>
    </Page>
  );
}

export default Register;
