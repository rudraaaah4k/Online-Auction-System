import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const StatCard = ({ value, label, delay }) => (
  <div className={`animate-fade-up ${delay}`} style={{
    textAlign: "center", padding: "20px 16px",
    background: "var(--surface)", borderRadius: "10px", border: "1px solid var(--border)",
  }}>
    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{value}</p>
    <p style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px" }}>{label}</p>
  </div>
);

const StepCard = ({ num, title, desc, delay }) => (
  <div className={`animate-fade-up ${delay}`} style={{
    flex: "1 1 200px", padding: "24px 20px",
    background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)",
    position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s",
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-dark)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <div style={{
      position: "absolute", top: "-10px", right: "-10px",
      fontFamily: "'Playfair Display', serif", fontSize: "5rem", fontWeight: 900,
      color: "rgba(201,168,76,0.06)", lineHeight: 1, userSelect: "none",
    }}>{num}</div>
    <div style={{
      width: "32px", height: "32px", borderRadius: "8px",
      background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700,
      color: "var(--gold)", marginBottom: "14px",
    }}>{num}</div>
    <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>{title}</h5>
    <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{desc}</p>
  </div>
);

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const steps = [
    { num: "1", title: "Post Items", desc: "Auctioneers list items with starting bids and time limits." },
    { num: "2", title: "Place Bids", desc: "Bidders compete in real-time to secure the winning price." },
    { num: "3", title: "Win Notification", desc: "The highest bidder receives an instant winning confirmation." },
    { num: "4", title: "Payment & Fees", desc: "Secure payment; auctioneers pay a small 5% platform fee." },
  ];

  return (
    <div className="page-content" style={{ position: "relative" }}>
      {/* Background orbs */}
      <div className="orb" style={{ width: "500px", height: "500px", background: "rgba(201,168,76,0.05)", top: "-100px", right: "-150px" }} />
      <div className="orb" style={{ width: "350px", height: "350px", background: "rgba(214,72,43,0.04)", bottom: "200px", left: "-100px", animationDelay: "-5s" }} />

      {/* Hero */}
      <section style={{ paddingTop: "20px", paddingBottom: "60px", position: "relative", zIndex: 1 }}>
        <div className="animate-fade-up">
          <span className="section-badge">Live Auctions · Est. 2025</span>
        </div>

        <h1 className="animate-fade-up delay-100" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em",
          color: "var(--text)", marginBottom: "8px", maxWidth: "800px",
        }}>
          Transparent
          <br />
          <span className="shimmer-text">Auctions</span>
        </h1>

        <h2 className="animate-fade-up delay-200" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 400, fontStyle: "italic",
          color: "var(--muted)", marginBottom: "28px",
        }}>
          Where every bid tells a story.
        </h2>

        <p className="animate-fade-up delay-300" style={{
          color: "var(--muted)", fontSize: "1rem", maxWidth: "480px",
          lineHeight: 1.7, marginBottom: "36px",
        }}>
          Bid on exclusive items with full transparency. No hidden fees, no surprises — just fair competition and real value.
        </p>

        <div className="animate-fade-up delay-400" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link to="/auctions" className="btn-primary" style={{ padding: "14px 32px", fontSize: "0.95rem" }}>
            Browse Auctions →
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/sign-up" className="btn-outline" style={{ padding: "13px 32px", fontSize: "0.95rem" }}>Create Account</Link>
              <Link to="/login" style={{ display: "flex", alignItems: "center", color: "var(--muted)", fontSize: "0.9rem", textDecoration: "none", padding: "13px 16px" }}>
                Sign In
              </Link>
            </>
          ) : (
            <Link to="/create-auction" className="btn-outline" style={{ padding: "13px 32px", fontSize: "0.95rem" }}>+ Create Auction</Link>
          )}
        </div>

        {/* Stats row */}
        <div className="animate-fade-up delay-500" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "12px", marginTop: "52px", maxWidth: "500px" }}>
          <StatCard value="12K+" label="Bidders" delay="" />
          <StatCard value="4.8K" label="Auctions" delay="delay-100" />
          <StatCard value="98%" label="Satisfaction" delay="delay-200" />
          <StatCard value="$2M+" label="Traded" delay="delay-300" />
        </div>
      </section>

      {/* Divider */}
      <div className="gold-line" style={{ marginBottom: "60px" }} />

      {/* How It Works */}
      <section style={{ marginBottom: "60px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "32px" }}>
          <span className="section-badge animate-fade-up">Process</span>
          <h2 className="animate-fade-up delay-100" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--text)" }}>
            How It Works
          </h2>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {steps.map((s, i) => (
            <StepCard key={s.num} {...s} delay={`delay-${(i + 1) * 100}`} />
          ))}
        </div>
      </section>

      {/* Featured Auctions */}
      <div className="gold-line" style={{ marginBottom: "60px" }} />
      <FeaturedAuctions />

      {/* Upcoming */}
      <div className="gold-line" style={{ margin: "60px 0" }} />
      <UpcomingAuctions />

      {/* Leaderboard */}
      <div className="gold-line" style={{ margin: "60px 0" }} />
      <Leaderboard />

      {/* CTA */}
      <div className="gold-line" style={{ margin: "60px 0" }} />
      {!isAuthenticated && (
        <section className="animate-fade-up" style={{
          textAlign: "center", padding: "60px 24px",
          background: "var(--surface)", borderRadius: "16px",
          border: "1px solid var(--border)", position: "relative", overflow: "hidden",
        }}>
          <div className="orb" style={{ width: "300px", height: "300px", background: "rgba(201,168,76,0.07)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="section-badge">Join Today</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "var(--text)", margin: "12px 0 16px" }}>
              Ready to Start Bidding?
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "32px", maxWidth: "420px", margin: "0 auto 32px" }}>
              Join thousands of buyers and sellers on PrimeBid's transparent auction platform.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/sign-up" className="btn-primary" style={{ padding: "14px 36px" }}>Get Started Free</Link>
              <Link to="/how-it-works-info" className="btn-outline" style={{ padding: "13px 36px" }}>Learn More</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
