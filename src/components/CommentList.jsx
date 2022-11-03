import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <ListGroup as="ol" key={comment.comment_id}>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <Link>{comment.author}</Link>
                </div>
                📅{" "}
                {new Date(comment.created_at.substring(0, 10)).toDateString()}
                {/* <Voter votes={article.votes} article_id={article.article_id} /> */}
                <p>{comment.body}</p>
              </div>
            </ListGroup.Item>
          </ListGroup>
        );
      })}
    </ul>
  );
}
