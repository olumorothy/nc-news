import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { fetchArticles } from "../Api";
import SortForm from "./SortForm";
import { ListGroup, Button, Badge, Spinner } from "react-bootstrap";
import Voter from "./Voter";

export default function ArticlesByTopic() {
  const { topic } = useParams();
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
  }, [topic, sortBy, order_by]);

  const filteredArticles = articles.filter(
    (article) => article.topic === topic
  );

  const sortAndOrderBy = (sort, order) => {
    setSortBy(sort);
    setOrderBy(order);
  };
  const setUrlParams = (url) => {
    setUrl(url);
  };

  return (
    <div>
      <div className="card-body">
        <h1 className="articles-h1">Articles on {topic}</h1>
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
        filteredArticles.map((article, index) => {
          return (
            <ListGroup as="ol" key={index}>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <Link to={`/articles/${article.article_id}`}>
                      {article.title}
                    </Link>
                  </div>
                  In {article.topic} ✡ Posted by {article.author} ✡ At{" "}
                  {article.created_at.substring(0, 10)}
                  <Voter
                    votes={article.votes}
                    article_id={article.article_id}
                  />
                  <Link to={`/articles/${article.article_id}`}>
                    <Button variant="primary">
                      💬 Comments{" "}
                      <Badge bg="secondary">{article.comment_count}</Badge>
                      <span className="visually-hidden">
                        Number of comments
                      </span>
                    </Button>
                  </Link>
                </div>
              </ListGroup.Item>
            </ListGroup>
          );
        })
      )}
    </div>
  );
}
