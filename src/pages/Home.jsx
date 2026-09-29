import Hero from "../sections/Hero";
import About from "../sections/About";
import Features from "../sections/Features";

function Home() {
  return (
    <div className="page">
      <Hero />
      <About />
      <Features />
    </div>
  );
}

export default Home;
