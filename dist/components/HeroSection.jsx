// src/components/HeroSection.jsx
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section style={{ padding: "4rem", textAlign: "center", backgroundColor: "#fff3f0" }}>
      <h2>Track Your Skin. See Real Progress.</h2>
      <p>A smart acne diary to help you visualize your journey to clearer skin.</p>
      <Link to="/tracker">
        <button style={{ 
          marginTop: "1rem", 
          padding: "0.75rem 2rem", 
          backgroundColor: "#ff6b6b", 
          color: "#fff", 
          border: "none", 
          borderRadius: "8px", 
          cursor: "pointer",
          fontSize: "1rem"
        }}>
          Get Started
        </button>
      </Link>
    </section>
  )
}
