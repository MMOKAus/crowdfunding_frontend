import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser";
import "./CreateFundraiserPage.css";

export default function CreateFundraiserPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    goal: "",
    is_open: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Convert goal to a number (DRF will often reject strings)
      const payload = {
        ...formData,
        goal: Number(formData.goal),
      };

      const created = await postFundraiser(payload);

      // Most DRF serializers return an `id`
      navigate(`/fundraisers/${created.id}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="create-page">
      <h1>Create a Fundraiser</h1>

      {error && <div className="error-box">{error}</div>}

      <form className="create-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
          />
        </label>

        <label>
          Image URL
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </label>

        <label>
          Target amount (goal)
          <input
            name="goal"
            type="number"
            min="1"
            value={formData.goal}
            onChange={handleChange}
            required
          />
        </label>

        <label className="checkbox-row">
          <input
            name="is_open"
            type="checkbox"
            checked={formData.is_open}
            onChange={handleChange}
          />
          Open to supporters
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Fundraiser"}
        </button>
      </form>
    </div>
  );
}
