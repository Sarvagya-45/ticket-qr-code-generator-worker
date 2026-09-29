import Button from "../components/Button";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="section-label">NextProject</p>

          <h1 className="hero__title">
            A clear starting point for the project.
          </h1>

          <p className="hero__description">
            This section will contain the project's actual purpose, audience,
            and primary action once the final specification is connected.
          </p>

          <div className="hero__actions">
            <Button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
