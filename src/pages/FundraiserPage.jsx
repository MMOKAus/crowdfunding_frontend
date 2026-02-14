import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import useFundraiser from "../hooks/use-fundraiser";
import { getToken, getUser } from "../utilities/auth";
import postPledge from "../api/post-pledge";
import deleteFundraiser from "../api/delete-fundraiser";

function FundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  const token = getToken();
  const user = getUser();

  const [pledgeAmount, setPledgeAmount] = useState("");
  const [pledgeComment, setPledgeComment] = useState("");
  const [pledgeAnonymous, setPledgeAnonymous] = useState(false);

  const [pledgeError, setPledgeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handlePledgeSubmit(e) {
    e.preventDefault();
    setPledgeError("");

    if (!fundraiser?.is_open) {
      setPledgeError("This fundraiser is closed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        amount: Number(pledgeAmount),
        anonymous: pledgeAnonymous,
        fundraiser: fundraiser.id,
  };

  if (pledgeComment.trim() !== "") {
    payload.comment = pledgeComment.trim();
  }

  await postPledge(payload);

  location.reload();

    } catch (err) {
      setPledgeError(err.message || "Could not create pledge.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setDeleteError("");

    const ok = window.confirm("Delete this fundraiser? This cannot be undone.");
    if (!ok) return;

    setIsDeleting(true);
    try {
      await deleteFundraiser(id);
      navigate("/");
    } catch (err) {
      setDeleteError(err.message || "Delete failed.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) return <p>Loading fundraiser...</p>;
  if (error) return <p>{error.message}</p>;

const ownerId = Number(fundraiser.owner);
const ownerUsername = fundraiser.owner_username ? String(fundraiser.owner_username) : null;

const userId = user?.id !== undefined && user?.id !== null ? Number(user.id) : null;
const username = user?.username ? String(user.username) : null;

const isOwner =
  token &&
  user &&
  user.username &&
  fundraiser.owner_username &&
  user.username === fundraiser.owner_username;



  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>{fundraiser.title}</h1>

      <p>
        <strong>Owner:</strong>{" "}
        {ownerUsername || `User #${ownerId}`}
      </p>

      <p>
        <strong>Created:</strong>{" "}
        {new Date(fundraiser.date_created).toLocaleString()}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {fundraiser.is_open ? "Open for pledges" : "Closed"}
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

      {/* Edit + Delete section (visible only if logged in AND owner) */}
      {token && isOwner && (
  <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
    <Link to={`/fundraisers/${fundraiser.id}/edit`}>Edit fundraiser</Link>

    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete fundraiser"}
    </button>
  </div>
)}

      {deleteError && (
        <div
          style={{
            marginTop: 12,
            background: "#ffe5e5",
            padding: 12,
            border: "1px solid #ffb3b3",
          }}
        >
          {deleteError}
        </div>
      )}

      <hr style={{ margin: "24px 0" }} />

      <h2>Pledges</h2>

      {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
        <ul>
          {fundraiser.pledges.map((pledge) => (
            <li key={pledge.id}>
              ${pledge.amount} from{" "}
              {pledge.anonymous ? "Anonymous" : pledge.supporter_username}
              {pledge.payload && <p>💬 {pledge.payload}</p>}
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
            <div
              style={{
                background: "#ffe5e5",
                padding: 12,
                border: "1px solid #ffb3b3",
              }}
            >
              {pledgeError}
            </div>
          )}

          <form
            onSubmit={handlePledgeSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 520,
            }}
          >
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


