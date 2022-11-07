import { Link } from "react-router-dom";
import error404 from "../images/error404.jpeg";
import errorImg from "../images/error.jpeg";
export default function ErrorPage({ error }) {
  console.log(error);
  if (!error) {
    console.log("undefined error");
    return (
      <>
        <img src={error404} alt="Page not found" />
        <h2>Page not found</h2>
        <Link to="/">
          <p>Take me back to Home Page</p>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <img src={errorImg} alt="An error occured alert" />
        <h2>Error:{error.status}</h2>
        <i>{error.msg}</i>
        <Link to={"/"}>Go back to Home Page</Link>
      </>
    );
  }
}
