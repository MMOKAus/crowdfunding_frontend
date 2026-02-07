import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import postLogin from "../api/post-login";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // ✅ stops page reload
    setError("");

    try {
      await postLogin({ username, password }); // ✅ triggers fetch
      navigate("/"); // ✅ redirect after login
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to manage your fundraisers and donations.</p>

        {/* ✅ Add onSubmit */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="username">Username</label>
            {/* ✅ Controlled input */}
            <input
              className="auth-input"
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            {/* ✅ Controlled input */}
            <input
              className="auth-input"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-button" type="submit">Log In</button>

          {/* ✅ Real error rendering */}
          {error && <p className="auth-error">{error}</p>}
        </form>

        <div className="auth-footer">
          No account? <Link to="/signup">Create one</Link>
        </div>
      </section>
    </main>
  );
}
