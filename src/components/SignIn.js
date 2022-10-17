import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Page from "./Page";
import axios from "axios";
import { UseGlobalContext } from "./utils/context";

function SignIn() {
  const navigate = useNavigate();
  const { setCurrentUser } = UseGlobalContext();
  const [users, setUsers] = useState([]);
  const [correctEmail, setCorrectEmail] = useState("");
  const [correctPassword, setCorrectPassword] = useState(true);
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignIn(() => {
      return {
        ...userSignIn,
        [name]: value,
      };
    });
  };

  const findUser = () => {
    const filteredUser = users.find((user) => {
      return user.email === userSignIn.email;
    });
    return filteredUser;
  };

  useEffect(() => {
    const filteredUser = findUser();
    if (filteredUser) {
      setCorrectEmail(filteredUser.email);
    } else {
      setCorrectEmail("");
    }
  }, [userSignIn]);

  const handleClick = (e) => {
    e.preventDefault();
    const filteredUser = findUser();
    console.log(filteredUser.password);
    if (filteredUser.password === userSignIn.password) {
      console.log("correct password");
      setCurrentUser(filteredUser);
      setCorrectEmail("");
      setUserSignIn({ email: "", password: "" });
      navigate("/recipes");
    } else {
      console.log("password incorrect");
      setCorrectPassword(false);
    }
  };

  return (
    <Page title="Sign In">
      <main className="signup-main">
        <div className="signup-div">
          <div className="signup-content-div">
            <h1 className="nav-title-heading">
              <i className="fa-solid fa-spoon"></i> RecipePro
            </h1>
            <h1 className="heading-signup">Log in to your account</h1>
            <form className="signup-form">
              <label>Email Address</label>
              <div className="signup-email-div">
                <input
                  type="email"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  value={userSignIn.email}
                />
                {correctEmail && <i className="fa-solid fa-check"></i>}
              </div>
              <label>Password</label>
              <div className="signup-password-div">
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  value={userSignIn.password}
                />
                {!correctPassword && (
                  <p className="signup-incorrect-password">
                    Incorrect Password
                  </p>
                )}
              </div>
              <div className="signup-form-btn-div">
                <button onClick={handleClick}>Next</button>
                <p>
                  Don't have an account?{" "}
                  <Link className="signup-login-link" to="/register">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="signup-background-div">
          {/* <h1>The cooking social network</h1> */}
        </div>
      </main>
    </Page>
  );
}

export default SignIn;
