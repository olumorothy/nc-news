import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { UserContext } from "./context/UserContext";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";

function App() {
  const [user, setUser] = useState("Moroti");
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          {!user ? (
            <SignIn />
          ) : (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
              </Routes>
            </>
          )}
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
