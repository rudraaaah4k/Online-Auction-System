import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const resolvedImgSrc =
    imgSrc && !String(imgSrc).startsWith("data:image/svg+xml")
      ? imgSrc
      : "/imageHolder.jpg";

  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;
    if (startDiff > 0) {
      return {
        type: "Starts In", live: false,
        days: Math.floor(startDiff / 864e5),
        hours: Math.floor((startDiff / 36e5) % 24),
        minutes: Math.floor((startDiff / 6e4) % 60),
        seconds: Math.floor((startDiff / 1e3) % 60),
      };
    } else if (endDiff > 0) {
      return {
        type: "Live", live: true,
        days: Math.floor(endDiff / 864e5),
        hours: Math.floor((endDiff / 36e5) % 24),
        minutes: Math.floor((endDiff / 6e4) % 60),
        seconds: Math.floor((endDiff / 1e3) % 60),
      };
    }
    return { type: "Ended", live: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(t);
  }, [startTime, endTime]);

  const pad = (n) => String(n).padStart(2, "0");
  const timeStr = timeLeft.days !== undefined
    ? `${timeLeft.days}d ${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
    : null;

  return (
    <Link to={`/auction/item/${id}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="auction-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "var(--surface2)" }}>
          <img
            src={resolvedImgSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
            onError={(event) => {
              event.currentTarget.src = "/imageHolder.jpg";
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          {/* Status badge */}
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            padding: "4px 10px", borderRadius: "99px", fontSize: "0.65rem",
            fontWeight: 700, letterSpacing: "0.08em",
            background: timeLeft.live ? "rgba(214,72,43,0.9)" : timeLeft.type === "Ended" ? "rgba(100,100,100,0.9)" : "rgba(201,168,76,0.9)",
            color: "white", backdropFilter: "blur(4px)",
          }}>
            {timeLeft.live ? "● LIVE" : timeLeft.type === "Ended" ? "ENDED" : "UPCOMING"}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <h5 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600,
            color: "var(--text)", lineHeight: 1.3,
          }}>{title}</h5>

          {startingBid && (
            <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
              Starting Bid{" "}
              <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.9rem" }}>
                PKR {Number(startingBid).toLocaleString()}
              </span>
            </p>
          )}

          {timeStr && (
            <div style={{
              marginTop: "auto", padding: "8px 10px", borderRadius: "8px",
              background: timeLeft.live ? "rgba(214,72,43,0.1)" : "rgba(201,168,76,0.08)",
              border: `1px solid ${timeLeft.live ? "rgba(214,72,43,0.25)" : "rgba(201,168,76,0.2)"}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{timeLeft.type}</span>
              <span style={{
                fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.04em",
                color: timeLeft.live ? "#ff6b4a" : "var(--gold)",
                fontFamily: "monospace",
              }}>{timeStr}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
