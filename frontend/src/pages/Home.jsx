import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}