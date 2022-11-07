import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../Api";
import ErrorPage from "./ErrorPage";

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTopics()
      .then((listOfTopics) => {
        setTopics(listOfTopics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        const errorData = {
          status: err.response.status,
          message: err.response.data.msg,
        };
        setError(errorData);
      });
  }, []);

  if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <div>
      <h2>List of Topics</h2>
      {topics.map((topic) => {
        return (
          <div key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>
              <h3>{topic.slug}</h3>
            </Link>
            <p>Description: {topic.description}</p>
          </div>
        );
      })}
      <Link to={"/articles"}>
        <h1 className="articles-h1">All Articles</h1>
      </Link>
    </div>
  );
}
