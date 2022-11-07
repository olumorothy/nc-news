import { useEffect, useState, useContext } from "react";
import { Card, Spinner, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  fetchArticlesById,
  fetchCommentByArticleId,
  postCommentByArticleId,
  deleteCommentById,
} from "../Api";
import { UserContext } from "../context/UserContext";

import CommentList from "./CommentList";

import Voter from "./Voter";

export default function SingleArticle() {
  const { user } = useContext(UserContext);
  const [bodyOfComment, setBodyOfComment] = useState("");
  const [commentIsPosted, setCommentIsPosted] = useState(false);
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [addCommentIsClicked, setAddcommentIsClicked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArticlesById(article_id).then((articleInfo) => {
      setArticle(articleInfo);
      setIsLoading(false);
    });
    fetchCommentByArticleId(article_id).then((commentInfo) => {
      setComments(commentInfo);
    });
  }, [article_id]);

  const toggleAddCommentClick = () => {
    setAddcommentIsClicked(!addCommentIsClicked);
    setCommentIsPosted(false);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (!bodyOfComment) {
      return alert("Comment body cannot be empty");
    }
    postCommentByArticleId(article_id, user, bodyOfComment).then((comment) => {
      setComments((currentComments) => {
        const presentComment = [...currentComments];
        presentComment.unshift(comment);
        return presentComment;
      });

      setCommentIsPosted(!commentIsPosted);
      setBodyOfComment("");
    });
  };
  const deleteComment = (comment_id) => {
    deleteCommentById(comment_id).then(() => {
      setComments((currComments) => {
        const currArticle = { ...article };
        const newComment = currComments.filter(
          (comment) => comment.comment_id !== comment_id
        );
        setArticle(currArticle);
        return newComment;
      });
      //setCommentDeleted(true);
    });
  };

  const handleBodyChange = (event) => {
    setBodyOfComment(event.target.value);
  };

  const commentForm = (
    <Form>
      <Form.Group
        className="form-group"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label>Your Comment</Form.Label>
        <Form.Control
          as="textarea"
          value={bodyOfComment}
          onChange={handleBodyChange}
          rows={3}
          placeholder="Please write a comment before submiiting"
          required
        />
      </Form.Group>
      <div>
        <Button onClick={handleSubmitComment}>Comment</Button>
        <Button onClick={toggleAddCommentClick}>Close</Button>
      </div>
    </Form>
  );

  const { title, author, topic, created_at, body, votes } = article;

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
            </Card.Subtitle>
            <Card.Text>{body}</Card.Text>
            <Voter votes={votes} article_id={article_id} />
            {addCommentIsClicked ? (
              commentForm
            ) : (
              <Button onClick={toggleAddCommentClick}>Add a comment</Button>
            )}

            {commentIsPosted && <p>Comment has been posted</p>}
          </Card.Body>
          <CommentList
            comments={comments}
            article={article}
            deleteComment={deleteComment}
          />
        </Card>
      )}
    </div>
  );
}
