import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard({ fundraiserData }) {
  const fundraiserLink = `/fundraisers/${fundraiserData.id}`;

  const totalPledged =
    typeof fundraiserData.total_pledged === "number"
      ? fundraiserData.total_pledged
      : 0;

  const percentage = fundraiserData.goal
    ? Math.min((totalPledged / fundraiserData.goal) * 100, 100)
    : 0;

  const goalReached = totalPledged >= fundraiserData.goal;

  return (
    <div className="fundraiser-card">
      <Link to={fundraiserLink}>
        <img
          src={fundraiserData.image}
          alt={fundraiserData.title}
        />
        <h3>{fundraiserData.title}</h3>
      </Link>
  
      
      <p className="meta">
        By {fundraiserData.owner_username || `User #${fundraiserData.owner}`}
      </p>
  
      <p className={`status ${fundraiserData.is_open ? "open" : "closed"}`}>
        {fundraiserData.is_open ? "Open for supporters" : "Closed"}
      </p>
  
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className={`progress-fill ${goalReached ? "goal-reached" : ""}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
  
        <div className="progress-info">
          <span>
            ${totalPledged.toLocaleString()} raised
          </span>
          <span>
            Goal: ${fundraiserData.goal.toLocaleString()}
          </span>
        </div>
  
        {goalReached && (
          <div className="goal-badge">🎉 Goal reached</div>
        )}
      </div>
    </div>
  );
        }
  

export default FundraiserCard;
