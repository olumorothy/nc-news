import { useEffect, useState } from "react";
import { Card, Spinner, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchArticlesById } from "../Api";
import Voter from "./Voter";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticlesById(article_id).then((articleInfo) => {
      setArticle(articleInfo);
      setIsLoading(false);
    });
  }, [article_id]);

  const { title, author, topic, created_at, body, comment_count, votes } =
    article;

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              In {topic} ✡ Posted by {author} ✡ At {created_at.substring(0, 10)}
              <Button variant="primary">
                💬 Comments <Badge bg="secondary">{comment_count}</Badge>
                <span className="visually-hidden">Number of comments</span>
              </Button>
            </Card.Subtitle>
            <Card.Text>{body}</Card.Text>
            <Voter votes={votes} />
            <Button>Add a comment</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
