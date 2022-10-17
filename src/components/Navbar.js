import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { UseGlobalContext } from "./utils/context";

function Navbar() {
  const { currentUser, setCurrentUser } = UseGlobalContext();
  const signedOut = Object.keys(currentUser).length === 0;

  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const [isMouseOverUser, setIsMouseOverUser] = useState(false);
  const [isMouseOverSignOut, setIsMouseOverSignOut] = useState(false);

  const user = currentUser._id;

  const handleClick = () => {
    setCurrentUser({});
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
      console.log(linksHeight);
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  return (
    <nav className="nav-div">
      <h1 className="nav-title-heading">
        <i className="fa-solid fa-spoon"></i> RecipeJournal
      </h1>

      <div className="nav-links-container" ref={linksContainerRef}>
        <div className="nav-links-text" ref={linksRef}>
          <NavLink className="nav-page nav-link-text" to="/">
            Home
          </NavLink>
          <NavLink className="nav-page nav-link-text" to="recipes">
            Recipes
          </NavLink>
          {currentUser.firstName && (
            <NavLink className="nav-page nav-link-text" to={`${user}/myrecipes`}>
              My Recipes
            </NavLink>
          )}
        </div>
      </div>

      <div className="nav-signin-burger-div">
        <button
          className="nav-burger-div"
          onClick={() => setShowLinks(!showLinks)}
        >
          {(showLinks ? (<i class="fa-solid fa-2xl fa-xmark"></i> ): (<i className="fa-solid fa-xl fa-bars"></i>))}
        </button>
        {signedOut ? (
          <div className="nav-signin-div">
            <NavLink className="nav-link-text" to="signin">
              Sign In
            </NavLink>
            <NavLink className="nav-link-text btn" to="register">
              Try Free
            </NavLink>
          </div>
        ) : (
          <div className="nav-signin-div">
            <NavLink className="nav-user-icon" to="/account">
              <i
                onMouseEnter={() => setIsMouseOverUser(true)}
                onMouseOut={() => setIsMouseOverUser(false)}
                className="fa-solid fa-xl fa-circle-user"
              ></i>
              {isMouseOverUser && <p className="nav-user-text">Your Account</p>}
            </NavLink>
            <NavLink className="nav-signout-icon" to="/">
              <i
                onMouseEnter={() => setIsMouseOverSignOut(true)}
                onMouseOut={() => setIsMouseOverSignOut(false)}
                onClick={handleClick}
                className="fa-solid fa-xl fa-right-from-bracket"
              ></i>
              {isMouseOverSignOut && (
                <p className="nav-signout-text">Log out</p>
              )}
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
