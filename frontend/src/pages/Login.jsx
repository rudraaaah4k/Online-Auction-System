import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // FIX: send plain JSON object, not FormData
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated]);

  return (
    <div className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: "460px" }}>
        {/* Background orbs */}
        <div className="orb" style={{ width: "280px", height: "280px", background: "rgba(201,168,76,0.07)", top: "-80px", right: "-60px" }} />
        <div className="orb" style={{ width: "200px", height: "200px", background: "rgba(214,72,43,0.06)", bottom: "-60px", left: "-40px", animationDelay: "-4s" }} />

        <div className="glass-card animate-fade-up" style={{ padding: "48px 40px", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--text)", marginBottom: "2px" }}>
                Prime<span style={{ color: "var(--gold)" }}>Bid</span>
              </p>
            </Link>
            <div className="gold-line" style={{ margin: "12px auto 16px", maxWidth: "80px" }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
              Welcome Back
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Sign in to your auction account</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="animate-fade-up delay-100">
              <label className="field-label">Email Address</label>
              <input
                type="email"
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="animate-fade-up delay-200">
              <label className="field-label">Password</label>
              <input
                type="password"
                className="field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="animate-fade-up delay-300" style={{ marginTop: "8px" }}>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: "100%", padding: "14px", fontSize: "1rem" }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Signing In…
                  </span>
                ) : "Sign In"}
              </button>
            </div>
          </form>

          <div className="animate-fade-up delay-400" style={{ textAlign: "center", marginTop: "24px" }}>
            <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
              Don't have an account?{" "}
              <Link to="/sign-up" style={{ color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}>
                Create one →
              </Link>
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-up delay-500" style={{
          display: "flex", gap: "1px", marginTop: "20px",
          background: "var(--border)", borderRadius: "10px", overflow: "hidden",
        }}>
          {[["12K+", "Bidders"], ["4.8K", "Auctions Won"], ["$2M+", "Value Traded"]].map(([val, label]) => (
            <div key={label} style={{ flex: 1, padding: "14px", textAlign: "center", background: "var(--surface)" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--gold)", fontWeight: 700 }}>{val}</p>
              <p style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.05em", marginTop: "2px" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Login;
