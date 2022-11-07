import { useState } from "react";
import { Button } from "react-bootstrap";
import { patchArticlesById } from "../Api";

export default function Voter({ article_id, votes }) {
  const [voteCount, setVoteCount] = useState(0);
  const [error, setError] = useState(null);

  const handleVote = (value) => {
    setVoteCount((currentVote) => currentVote + value);

    patchArticlesById(article_id, value)
      .then((data) => {})
      .catch((err) => {
        setVoteCount((currentVote) => currentVote - value);
        const errorData = {
          status: err.response.status,
          message: err.response.data.msg,
        };
        setError(errorData);
      });
  };

  return (
    <div>
      <span>🗳️{votes + voteCount} votes</span>
      <Button
        className="btn-vote"
        variant="light"
        onClick={() => {
          handleVote(1);
        }}
        disabled={voteCount === 1}
      >
        👍
      </Button>
      <Button
        className="btn-vote"
        variant="light"
        onClick={() => {
          handleVote(-1);
        }}
        disabled={voteCount === -1}
      >
        👎
      </Button>
    </div>
  );
}
