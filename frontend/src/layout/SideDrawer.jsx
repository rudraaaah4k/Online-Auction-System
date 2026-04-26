import React, { useState, useEffect } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaUserCircle } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, icon, children, onClick }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 14px", borderRadius: "8px", fontWeight: 500,
          fontSize: "0.95rem", letterSpacing: "0.01em", transition: "all 0.2s",
          color: active ? "var(--gold)" : "var(--text)",
          background: active ? "rgba(201,168,76,0.1)" : "transparent",
          border: active ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
          textDecoration: "none",
        }}
        onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.background = "rgba(201,168,76,0.06)"; } }}
        onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "transparent"; } }}
      >
        <span style={{ fontSize: "1.1rem", color: active ? "var(--gold)" : "var(--muted)" }}>{icon}</span>
        {children}
      </Link>
    </li>
  );
};

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const close = () => setShow(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setShow(!show)}
        style={{
          position: "fixed", right: "16px", top: "16px", zIndex: 1100,
          background: "var(--ember)", color: "white", border: "none",
          padding: "10px 12px", borderRadius: "10px", fontSize: "1.3rem",
          cursor: "pointer", display: "flex", alignItems: "center",
          boxShadow: "0 4px 20px rgba(214,72,43,0.4)",
        }}
        className="lg:hidden"
      >
        <GiHamburgerMenu />
      </button>

      {/* Backdrop */}
      {show && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            zIndex: 1050, backdropFilter: "blur(4px)",
          }}
          className="lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          width: "300px", height: "100vh", position: "fixed", top: 0,
          left: show ? "0" : "-100%", zIndex: 1060,
          background: "var(--charcoal)",
          borderRight: "1px solid var(--border)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "24px 20px",
          transition: "left 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
        className="lg:!left-0"
      >
        {/* Logo */}
        <div>
          <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/" onClick={close} style={{ textDecoration: "none" }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
                Prime<span style={{ color: "var(--gold)" }}>Bid</span>
              </h4>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginTop: "2px" }}>
                Luxury Auction House
              </p>
            </Link>
            <IoMdCloseCircleOutline
              onClick={close}
              style={{ fontSize: "1.5rem", color: "var(--muted)", cursor: "pointer" }}
              className="lg:hidden"
            />
          </div>

          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--border), transparent)", marginBottom: "20px" }} />

          {/* User info if authenticated */}
          {isAuthenticated && user && (
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "12px", background: "var(--surface)", borderRadius: "10px",
              marginBottom: "20px", border: "1px solid var(--border)",
            }}>
              <img
                src={user.profileImage?.url || "/imageHolder.jpg"}
                alt={user.userName}
                style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold-dark)" }}
              />
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.2 }}>{user.userName}</p>
                <p style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.05em" }}>{user.role}</p>
              </div>
            </div>
          )}

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
            <NavLink to="/auctions" icon={<RiAuctionFill />} onClick={close}>Auctions</NavLink>
            <NavLink to="/leaderboard" icon={<MdLeaderboard />} onClick={close}>Leaderboard</NavLink>

            {isAuthenticated && user?.role === "Auctioneer" && (<>
              <NavLink to="/submit-commission" icon={<FaFileInvoiceDollar />} onClick={close}>Submit Commission</NavLink>
              <NavLink to="/create-auction" icon={<IoIosCreate />} onClick={close}>Create Auction</NavLink>
              <NavLink to="/view-my-auctions" icon={<FaEye />} onClick={close}>My Auctions</NavLink>
            </>)}

            {isAuthenticated && user?.role === "Super Admin" && (
              <NavLink to="/dashboard" icon={<MdDashboard />} onClick={close}>Dashboard</NavLink>
            )}
          </ul>

          <div style={{ height: "1px", background: "var(--border)", margin: "16px 0" }} />

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
            {isAuthenticated && <NavLink to="/me" icon={<FaUserCircle />} onClick={close}>My Profile</NavLink>}
            <NavLink to="/how-it-works-info" icon={<SiGooglesearchconsole />} onClick={close}>How It Works</NavLink>
            <NavLink to="/about" icon={<BsFillInfoSquareFill />} onClick={close}>About Us</NavLink>
          </ul>

          {/* Auth buttons */}
          <div style={{ marginTop: "20px" }}>
            {!isAuthenticated ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <Link to="/sign-up" onClick={close} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Sign Up</Link>
                <Link to="/login" onClick={close} className="btn-outline" style={{ flex: 1, justifyContent: "center" }}>Login</Link>
              </div>
            ) : (
              <button
                onClick={() => { dispatch(logout()); close(); }}
                style={{
                  width: "100%", padding: "10px", borderRadius: "8px",
                  background: "rgba(214,72,43,0.1)", border: "1px solid rgba(214,72,43,0.3)",
                  color: "var(--ember)", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(214,72,43,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(214,72,43,0.1)"}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div>
          <div style={{ height: "1px", background: "var(--border)", marginBottom: "16px" }} />
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <a href="#" style={{ padding: "8px", borderRadius: "6px", background: "var(--surface)", color: "var(--muted)", display: "flex", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#1877f2"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
            ><FaFacebook /></a>
            <a href="#" style={{ padding: "8px", borderRadius: "6px", background: "var(--surface)", color: "var(--muted)", display: "flex", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e1306c"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
            ><RiInstagramFill /></a>
          </div>
          <Link to="/contact" onClick={close} style={{ color: "var(--muted)", fontSize: "0.8rem", textDecoration: "none", display: "block", marginBottom: "4px" }}>Contact Us</Link>
          <p style={{ color: "var(--muted)", fontSize: "0.75rem" }}>© PrimeBid, LLC. 2025</p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
