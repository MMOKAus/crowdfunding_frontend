import { Link } from "react-router-dom";
import grumpyCat from "../assets/grumpy-cat.jpeg";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <img src={grumpyCat} alt="Grumpy cat" className="notfound-cat" />

      <h1 className="notfound-title">Meowww… 404</h1>

      <p className="notfound-text">
        I looked everywhere (even under the couch).
        <br />
        This page does not exist.
      </p>

      <p className="notfound-subtext">
        Maybe you typed the wrong link?
        <br />
        Or maybe it was knocked off the table.
      </p>

      <Link to="/" className="notfound-button">
        Take me back home 🐾
      </Link>
    </div>
  );
}
