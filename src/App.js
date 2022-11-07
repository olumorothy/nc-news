import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { UserContext } from "./context/UserContext";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import ArticlesByTopic from "./components/ArticlesByTopic";
import SingleArticle from "./components/SingleArticle";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [user, setUser] = useState(null);
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
                <Route path="/topics" element={<Home />} />
                <Route path="/topics/:topic" element={<ArticlesByTopic />} />
                <Route
                  path="/articles/:article_id"
                  element={<SingleArticle />}
                />
                <Route path="*" element={<ErrorPage />}></Route>
              </Routes>
            </>
          )}
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
