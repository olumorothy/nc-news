import { useEffect, useState } from "react";
import { fetchArticles } from "../Api";
import ArticlesCard from "./ArticlesCard";
import { Spinner } from "react-bootstrap";
import SortForm from "./SortForm";
import { useSearchParams } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order_by, setOrderBy] = useState("desc");
  const [url, setUrl] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(sortBy, order_by).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [sortBy, order_by]);

  const sortAndOrderBy = (sort, order) => {
    setSortBy(sort);
    setOrderBy(order);
  };
  const setUrlParams = (url) => {
    setUrl(url);
  };
  return (
    <>
      <div className="card-body">
        <h1 className="articles-h1">All Articles</h1>
        <SortForm
          sortAndOrderBy={sortAndOrderBy}
          sort_by={sortBy}
          order_by={order_by}
          setUrlParams={setUrlParams}
        />
      </div>

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
