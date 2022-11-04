import { Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { fetchAllUsers } from "../Api";
import { UserContext } from "../context/UserContext";

export default function SignIn() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllUsers().then(({ users }) => {
      setUsersList(users);
      setIsLoading(false);
    });
  }, []);

  const { setUser } = useContext(UserContext);

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
