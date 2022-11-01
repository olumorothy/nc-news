import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
function ArticlesCard({ article }) {
  const { author, title, topic, created_at, votes } = article;
  const formattedDate = created_at.substring(0, 10);
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{title}</div>
          In {topic} ✡ Posted by {author} ✡ At {formattedDate}
          <Button variant="primary">
            💬 Comments <Badge bg="secondary">{0}</Badge>
            <span className="visually-hidden">Number of comments</span>
          </Button>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default ArticlesCard;
