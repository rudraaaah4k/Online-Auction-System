import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const todayStr = new Date().toDateString();
  const todayAuctions = allAuctions.filter(
    (item) => new Date(item.startTime).toDateString() === todayStr
  );

  return (
    <section>
      <div style={{ marginBottom: "28px" }}>
        <span className="section-badge">Today</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--text)" }}>
          Auctions Starting Today
        </h2>
      </div>

      {todayAuctions.length === 0 ? (
        <div style={{ padding: "40px 24px", background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)", textAlign: "center" }}>
          <RiAuctionFill style={{ fontSize: "2rem", color: "var(--muted)", marginBottom: "10px" }} />
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>No auctions starting today — check back soon.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {todayAuctions.slice(0, 6).map((item, i) => (
            <Link
              key={item._id}
              to={`/auction/item/${item._id}`}
              className="animate-fade-up"
              style={{
                textDecoration: "none", display: "flex", alignItems: "center", gap: "14px",
                padding: "16px", background: "var(--surface)", borderRadius: "12px",
                border: "1px solid var(--border)", transition: "all 0.25s",
                animationDelay: `${i * 0.08}s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-dark)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <img
                src={item.image?.url}
                alt={item.title}
                style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border)" }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.title}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "2px" }}>
                  Starting Bid: <span style={{ color: "var(--gold)", fontWeight: 600 }}>PKR {Number(item.startingBid).toLocaleString()}</span>
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
                  {new Date(item.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--ember)", flexShrink: 0 }} className="animate-ticker" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingAuctions;
