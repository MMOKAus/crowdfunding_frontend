import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";



function SignUpForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!credentials.username || !credentials.password) return;

    try {
      const response = await postSignup(
        credentials.username,
        credentials.password
      );

      // OPTION A (most common): go to login after signup
      navigate("/login");

      // OPTION B (only if your backend returns a token on signup)
      // localStorage.setItem("token", response.token);
      // navigate("/");

    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label className="auth-label" htmlFor="username">
          Create Username
        </label>
        <input
          className="auth-input"
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-label" htmlFor="password">
          Create Password
        </label>
        <input
          className="auth-input"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </div>

      <button className="auth-button" type="submit">
        Create Account
      </button>
    </form>
  );
}

export default SignUpForm;
