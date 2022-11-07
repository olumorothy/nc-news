import { Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { fetchAllUsers } from "../Api";
import { UserContext } from "../context/UserContext";
import ErrorPage from "./ErrorPage";

export default function SignIn() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    fetchAllUsers()
      .then(({ users }) => {
        setUsersList(users);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        const errorData = {
          status: err.response.status,
          message: err.response.data.msg,
        };
        setError(errorData);
      });
  }, []);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading users...</span>
        </Spinner>
      ) : (
        usersList.map((user) => {
          return (
            <li
              key={user.username}
              onClick={() => {
                setUser(user.username);
              }}
            >
              {user.username}
            </li>
          );
        })
      )}
    </>
  );
}
