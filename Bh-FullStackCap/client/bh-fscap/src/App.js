import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { useEffect } from "react";
import Authorize from "./components/Authorize";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userProfile")
  );
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const appStyle = {
    background: `linear-gradient(to bottom, #7d7d7d, #ffffff)`,
    minHeight: "100vh",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn ? (
          <>
            <ApplicationViews loggedInUser={loggedInUser} />
          </>
        ) : (
          <Authorize
            setIsLoggedIn={setIsLoggedIn}
            setLoggedInUser={setLoggedInUser}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
