import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../context/UserContext";

export default function CommentList({ comments, deleteComment }) {
  const { user } = useContext(UserContext);

  const removeComment = (id) => {
    deleteComment(id);
  };

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
                <p>{comment.body}</p>
                {comment.author === user ? (
                  <Button
                    onClick={() => {
                      removeComment(comment.comment_id);
                    }}
                  >
                    Delete comment
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>
        );
      })}
    </ul>
  );
}
