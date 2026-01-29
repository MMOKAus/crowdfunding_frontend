import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;

  return (
    <div className="fundraiser-card">
      <Link to="/fundraiser">
        <img src={fundraiserData.image} />
        <h3>{fundraiserData.title}</h3>
      </Link>
    </div>
  );
}

<span className="badge">Closed</span>


export default FundraiserCard;