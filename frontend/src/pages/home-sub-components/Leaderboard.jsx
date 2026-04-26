import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
        <div>
          <span className="section-badge">Rankings</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--text)" }}>
            Top Bidders
          </h2>
        </div>
        <Link to="/leaderboard" style={{ color: "var(--gold)", fontSize: "0.85rem", textDecoration: "none", fontWeight: 500 }}>
          Full Board →
        </Link>
      </div>

      {leaderboard.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)", color: "var(--muted)" }}>
          No leaderboard data yet.
        </div>
      ) : (
        <div style={{ background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 140px 120px", gap: "12px", padding: "12px 20px", background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
            {["#", "Bidder", "Amount Spent", "Auctions Won"].map(h => (
              <span key={h} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>{h}</span>
            ))}
          </div>

          {leaderboard.slice(0, 10).map((user, i) => (
            <div
              key={user._id}
              className={`animate-fade-up`}
              style={{
                display: "grid", gridTemplateColumns: "48px 1fr 140px 120px",
                gap: "12px", padding: "14px 20px", alignItems: "center",
                borderBottom: i < 9 ? "1px solid var(--border)" : "none",
                animationDelay: `${i * 0.06}s`,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Rank */}
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: i < 3 ? "1.1rem" : "0.9rem",
                fontWeight: 700,
                color: i < 3 ? medalColors[i] : "var(--muted)",
              }}>
                {i < 3 ? ["🥇","🥈","🥉"][i] : `${i + 1}`}
              </span>

              {/* User */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={user.profileImage?.url || "/imageHolder.jpg"}
                  alt={user.userName}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${i < 3 ? medalColors[i] : "var(--border)"}` }}
                />
                <span style={{ fontWeight: 500, fontSize: "0.9rem", color: "var(--text)" }}>{user.userName}</span>
              </div>

              {/* Spent */}
              <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.88rem" }}>
                PKR {Number(user.moneySpent).toLocaleString()}
              </span>

              {/* Won */}
              <span style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
                {user.auctionsWon || 0} <span style={{ fontSize: "0.75rem" }}>won</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
