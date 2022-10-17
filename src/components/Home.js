import React from "react";
import { UseGlobalContext } from "./utils/context";
import { Link } from "react-router-dom";
import Page from "./Page";

function Home() {
  const { currentUser } = UseGlobalContext()
  const { firstName } = currentUser;

  return (
    <Page title="Home">
      <main className="home-main">
        <div className="home-heading-div">
          {firstName ? (
            <h1 className="home-heading-main">Chef {firstName}</h1>
          ) : (
            <h1 className="home-heading-main">Cook smarter</h1>
          )}
          <p className="home-heading-text">
            A better way to collect and share your favourite recipes
          </p>
        </div>
        <div className="home-btn-div">
          <Link className="home-btn-start" to="recipes">
            Get Started
          </Link>
        </div>
      </main>
    </Page>
  );
}

export default Home;
