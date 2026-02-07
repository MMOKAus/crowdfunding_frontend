import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm"; // or whatever your form component is called
import "./SignUpPage.css";

export default function SignUpPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">
          Sign up to start creating and supporting fundraisers.
        </p>

        <SignUpForm />

        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </section>
    </main>
  );
}
