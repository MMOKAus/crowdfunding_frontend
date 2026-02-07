import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  const { fundraisers } = useFundraisers();

  return (
    <main className="home">
      <section className="hero">
        <h1>Support causes that matter</h1>
        <p>Discover and support fundraisers created by real people.</p>
      </section>

      <section id="fundraiser-list">
        {fundraisers.map((fundraiserData) => (
          <FundraiserCard
            key={fundraiserData.id}
            fundraiserData={fundraiserData}
          />
        ))}
      </section>
    </main>
  );
}

export default HomePage;
