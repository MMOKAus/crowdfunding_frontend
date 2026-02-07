import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import useFundraiser from "../hooks/use-fundraiser";
import { getUser, getToken } from "../utilities/auth";
import postPledge from "../api/post-pledge";
import getFundraiser from "../api/get-fundraiser";

function FundraiserPage() {
  const { id } = useParams();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  const user = getUser();
  const token = getToken();

  const [pledgeAmount, setPledgeAmount] = useState("");
  const [pledgeComment, setPledgeComment] = useState("");
  const [pledgeAnonymous, setPledgeAnonymous] = useState(false);

  const [pledgeError, setPledgeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We need a way to refresh pledges after posting.
  // Since your hook doesn't expose setFundraiser, we’ll do a simple page refresh fallback OR upgrade the hook next.
  // Here’s the upgrade-free approach: refetch and reload using window.location (simple + works).
  // If you want a “proper” refresh without reload, next step we’ll update the hook to expose a refetch().
  async function handlePledgeSubmit(e) {
    e.preventDefault();
    setPledgeError("");

    if (!fundraiser?.is_open) {
      setPledgeError("This fundraiser is closed.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postPledge({
        amount: Number(pledgeAmount),
        comment: pledgeComment,
        anonymous: pledgeAnonymous,
        fundraiser: fundraiser.id, // or Number(id)
      });

      // simple, reliable refresh
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (err) {
      setPledgeError(err.message || "Could not create pledge.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <p>Loading fundraiser...</p>;
  if (error) return <p>{error.message}</p>;

  const isOwner = user && fundraiser.owner === user.id;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>{fundraiser.title}</h1>

      <p>
        <strong>Created:</strong>{" "}
        {new Date(fundraiser.date_created).toLocaleString()}
      </p>

      <p>
        <strong>Status:</strong> {fundraiser.is_open ? "Open for pledges" : "Closed"}
      </p>

      <img
        src={fundraiser.image}
        alt={fundraiser.title}
        style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
      />

      <p style={{ marginTop: 16 }}>{fundraiser.description}</p>

      <p>
        <strong>Goal:</strong> ${fundraiser.goal}
      </p>

      {isOwner && (
        <div style={{ marginTop: 16 }}>
          <Link to={`/fundraisers/${fundraiser.id}/edit`}>Edit fundraiser</Link>
        </div>
      )}

      <hr style={{ margin: "24px 0" }} />

      <h2>Pledges</h2>

      {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
        <ul>
          {fundraiser.pledges.map((pledge) => (
            <li key={pledge.id}>
              ${pledge.amount} from {pledge.anonymous ? "Anonymous" : pledge.supporter}
              {pledge.comment ? <p>💬 {pledge.comment}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pledges yet.</p>
      )}

      <hr style={{ margin: "24px 0" }} />

      {/* Pledge form */}
      {!token ? (
        <p>
          <Link to="/login">Log in</Link> to make a pledge.
        </p>
      ) : !fundraiser.is_open ? (
        <p>This fundraiser is closed to new pledges.</p>
      ) : (
        <div>
          <h3>Make a pledge</h3>

          {pledgeError && (
            <div style={{ background: "#ffe5e5", padding: 12, border: "1px solid #ffb3b3" }}>
              {pledgeError}
            </div>
          )}

          <form onSubmit={handlePledgeSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}>
            <label>
              Amount
              <input
                type="number"
                min="1"
                value={pledgeAmount}
                onChange={(e) => setPledgeAmount(e.target.value)}
                required
              />
            </label>

            <label>
              Comment (optional)
              <textarea
                value={pledgeComment}
                onChange={(e) => setPledgeComment(e.target.value)}
                rows="3"
              />
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={pledgeAnonymous}
                onChange={(e) => setPledgeAnonymous(e.target.checked)}
              />
              Make this pledge anonymous
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit pledge"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FundraiserPage;
