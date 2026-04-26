import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
        <div>
          <span className="section-badge">Curated</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--text)" }}>
            Featured Auctions
          </h2>
        </div>
        <Link to="/auctions" style={{ color: "var(--gold)", fontSize: "0.85rem", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>
          View All →
        </Link>
      </div>
      {allAuctions.length === 0 ? (
        <div style={{ padding: "60px 0", textAlign: "center", color: "var(--muted)" }}>
          <p style={{ fontSize: "1rem" }}>No auctions available yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {allAuctions.slice(0, 8).map((item, i) => (
            <div key={item._id} className={`animate-fade-up`} style={{ animationDelay: `${i * 0.07}s` }}>
              <Card
                title={item.title}
                imgSrc={item.image?.url}
                startTime={item.startTime}
                endTime={item.endTime}
                startingBid={item.startingBid}
                id={item._id}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedAuctions;
