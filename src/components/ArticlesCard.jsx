import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Voter from "./Voter";
function ArticlesCard({ article }) {
  const { article_id, author, title, topic, created_at, comment_count, votes } =
    article;
  const formattedDate = created_at.substring(0, 10);
  return (
    <ListGroup as="ol" className="list-group">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            <Link to={`/articles/${article_id}`}>{title}</Link>
          </div>
          In {topic} ✡ Posted by {author} ✡ At {formattedDate}
          <Button variant="primary">
            💬 Comments <Badge bg="secondary">{comment_count}</Badge>
            <span className="visually-hidden">Number of comments</span>
          </Button>
          <Voter article_id={article_id} votes={votes} />
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default ArticlesCard;
