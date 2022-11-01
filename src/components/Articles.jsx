import { useEffect, useState } from "react";
import { fetchArticles } from "../Api";
import ArticlesCard from "./ArticlesCard";
import { Spinner } from "react-bootstrap";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <h1>List of All Articles</h1>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        articles.map((article) => {
          return <ArticlesCard key={article.article_id} article={article} />;
        })
      )}
    </>
  );
}
