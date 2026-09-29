const features = [
  {
    number: "01",
    title: "Clear structure",
    description:
      "The interface is organized so users can understand where they are and what they can do.",
  },
  {
    number: "02",
    title: "Useful interactions",
    description:
      "Interactive elements will perform real actions instead of acting as decorative buttons.",
  },
  {
    number: "03",
    title: "Responsive layout",
    description:
      "The layout is designed to work across mobile, tablet, and desktop screen sizes.",
  },
];

function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Features</p>

          <h2 className="section-title">
            What the interface is designed to provide.
          </h2>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span className="feature-card__number">{feature.number}</span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
