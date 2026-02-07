import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import getFundraiser from "../api/get-fundraiser";
import patchFundraiser from "../api/patch-fundraiser";

export default function EditFundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    goal: "",
    is_open: true,
  });

  useEffect(() => {
    async function fetchFundraiser() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getFundraiser(id);

        setFormData({
          title: data.title || "",
          description: data.description || "",
          image: data.image || "",
          goal: data.goal ?? "",
          is_open: data.is_open ?? true,
        });
      } catch (err) {
        setError(err.message || "Could not load fundraiser.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchFundraiser();
  }, [id]);

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

    try {
      const payload = {
        ...formData,
        goal: Number(formData.goal),
      };

      const updated = await patchFundraiser(id, payload);
      navigate(`/fundraisers/${updated.id}`);
    } catch (err) {
      setError(err.message || "You are not authorised to edit this fundraiser.");
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1>Edit Fundraiser</h1>

      {error && (
        <div style={{ background: "#ffe5e5", padding: 12, border: "1px solid #ffb3b3" }}>
          {error}
          <div style={{ marginTop: 10 }}>
            <Link to={`/fundraisers/${id}`}>Back to fundraiser</Link>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <label>
          Title
          <input name="title" value={formData.title} onChange={handleChange} required />
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
          <input name="image" value={formData.image} onChange={handleChange} required />
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

        <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input name="is_open" type="checkbox" checked={formData.is_open} onChange={handleChange} />
          Open to supporters
        </label>

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}
