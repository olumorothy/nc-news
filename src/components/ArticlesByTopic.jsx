import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../Api";
import { ListGroup, Button, Badge, Spinner } from "react-bootstrap";
import Voter from "./Voter";

export default function ArticlesByTopic() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic]);

  const filteredArticles = articles.filter(
    (article) => article.topic === topic
  );

  return (
    <div>
      <h2>Articles on {topic}</h2>
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
                  <Button variant="primary">
                    💬 Comments{" "}
                    <Badge bg="secondary">{article.comment_count}</Badge>
                    <span className="visually-hidden">Number of comments</span>
                  </Button>
                  <Voter
                    votes={article.votes}
                    article_id={article.article_id}
                  />
                </div>
              </ListGroup.Item>
            </ListGroup>
          );
        })
      )}
    </div>
  );
}
