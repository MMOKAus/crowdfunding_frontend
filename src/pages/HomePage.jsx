import { Link } from "react-router-dom";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import dogLeft from "../assets/bunny_cut.png";
import catLeft from "../assets/cat_cut.png";
import bunnyBottom from "../assets/dog_cut4.png";
import dogRight from "../assets/dog_cut5.png";
import catRight from "../assets/cat_cut3.png";

function HomePage() {
  const { fundraisers } = useFundraisers();

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-inner">
        <div className="hero-pets hero-pets-left" aria-hidden="true">
          <img src={dogLeft} alt="" className="pet pet-1" />
          <img src={catLeft} alt="" className="pet pet-2" />
          <img src={bunnyBottom} alt="" className="pet pet-3" />
        </div>

          <div className="hero-content">
            <div className="hero-brand">PawFund</div>
            <h2 className="hero-title">Support animals when their humans need help most</h2>
            <p className="hero-subtitle">
            PawFund helps animals get the care they need when their owners face crisis, from vet emergencies to unexpected hardship. Start a fundraiser or support a story that matters.
            </p>

            <div className="hero-actions">
              <Link className="cta-primary" to="/create">
                Start a fundraiser
              </Link>
              <a className="cta-secondary" href="#fundraiser-list">
                Browse fundraisers
              </a>
            </div>
          </div>

          <div className="hero-pets hero-pets-right" aria-hidden="true">
            <img src={dogRight} alt="" className="pet pet-4" />
            <img src={catRight} alt="" className="pet pet-5" />
          </div>
        </div>
      </section>

      <section className="section-head">
        <h2>Active fundraisers</h2>
        <p>Discover and support fundraisers created by real people.</p>
      </section>

      <section id="fundraiser-list">
        {fundraisers.map((fundraiserData) => (
          <FundraiserCard key={fundraiserData.id} fundraiserData={fundraiserData} />
        ))}
      </section>
    </main>
  );
}

export default HomePage;
