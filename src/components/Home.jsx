import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../Api";

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchTopics().then((listOfTopics) => {
      setTopics(listOfTopics);
      setIsLoading(false);
    });
  }, []);

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
    </div>
  );
}
