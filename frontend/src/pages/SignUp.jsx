import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "28px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
      <div style={{ height: "1px", flex: 1, background: "var(--border)" }} />
      <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", whiteSpace: "nowrap" }}>{title}</span>
      <div style={{ height: "1px", flex: 1, background: "var(--border)" }} />
    </div>
    {children}
  </div>
);

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  const inputRow = (fields) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
      {fields}
    </div>
  );

  return (
    <div className="page-content" style={{ paddingTop: "60px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
        {/* Orbs */}
        <div className="orb" style={{ width: "300px", height: "300px", background: "rgba(201,168,76,0.06)", top: "0", right: "-100px" }} />

        {/* Header */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-badge">New Account</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)", lineHeight: 1.2, marginBottom: "10px" }}>
            Join <span className="shimmer-text">PrimeBid</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Create your account and start bidding on exclusive items</p>
        </div>

        <div className="glass-card animate-fade-up delay-100" style={{ padding: "40px 36px", position: "relative", zIndex: 1 }}>
          <form onSubmit={handleRegister}>

            <Section title="Personal Details">
              {inputRow([
                <div key="name">
                  <label className="field-label">Full Name</label>
                  <input type="text" className="field" value={userName} onChange={e => setUserName(e.target.value)} placeholder="John Doe" required />
                </div>,
                <div key="email">
                  <label className="field-label">Email Address</label>
                  <input type="email" className="field" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>,
              ])}
              <div style={{ height: "16px" }} />
              {inputRow([
                <div key="phone">
                  <label className="field-label">Phone (11 digits)</label>
                  <input type="number" className="field" value={phone} onChange={e => setPhone(e.target.value)} placeholder="03001234567" required />
                </div>,
                <div key="address">
                  <label className="field-label">Address</label>
                  <input type="text" className="field" value={address} onChange={e => setAddress(e.target.value)} placeholder="City, Country" required />
                </div>,
              ])}
              <div style={{ height: "16px" }} />
              {inputRow([
                <div key="role">
                  <label className="field-label">Account Role</label>
                  <select className="field" value={role} onChange={e => setRole(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="Auctioneer">Auctioneer</option>
                    <option value="Bidder">Bidder</option>
                  </select>
                </div>,
                <div key="pw">
                  <label className="field-label">Password</label>
                  <input type="password" className="field" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" required />
                </div>,
              ])}
            </Section>

            {/* Profile Image */}
            <Section title="Profile Photo">
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={profileImagePreview || "/imageHolder.jpg"}
                    alt="Profile preview"
                    style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold-dark)" }}
                  />
                  {profileImagePreview && (
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(201,168,76,0.2)" }} />
                  )}
                </div>
                <label style={{
                  padding: "10px 18px", borderRadius: "8px", border: "1px dashed var(--border)",
                  color: "var(--muted)", fontSize: "0.85rem", cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                  background: "var(--surface)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
                >
                  {profileImagePreview ? "Change Photo" : "Upload Photo"}
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={imageHandler} style={{ display: "none" }} />
                </label>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>PNG, JPG, WEBP</p>
              </div>
            </Section>

            {/* Auctioneer payment details */}
            {role === "Auctioneer" && (
              <div className="animate-fade-up">
                <Section title="Bank Details">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                    <div>
                      <label className="field-label">Bank Name</label>
                      <select className="field" value={bankName} onChange={e => setBankName(e.target.value)} required>
                        <option value="">Select Bank</option>
                        <option value="Meezan Bank">Meezan Bank</option>
                        <option value="UBL">UBL</option>
                        <option value="HBL">HBL</option>
                        <option value="Allied Bank">Allied Bank</option>
                      </select>
                    </div>
                    <div>
                      <label className="field-label">IBAN / Account No.</label>
                      <input type="text" className="field" value={bankAccountNumber} onChange={e => setBankAccountNumber(e.target.value)} placeholder="IBAN / IFSC" required />
                    </div>
                    <div>
                      <label className="field-label">Account Holder</label>
                      <input type="text" className="field" value={bankAccountName} onChange={e => setBankAccountName(e.target.value)} placeholder="Your Name" required />
                    </div>
                  </div>
                </Section>

                <Section title="Digital Payments">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                    <div>
                      <label className="field-label">Easypaisa Number</label>
                      <input type="number" className="field" value={easypaisaAccountNumber} onChange={e => setEasypaisaAccountNumber(e.target.value)} placeholder="03XXXXXXXXX" required />
                    </div>
                    <div>
                      <label className="field-label">PayPal Email</label>
                      <input type="email" className="field" value={paypalEmail} onChange={e => setPaypalEmail(e.target.value)} placeholder="paypal@you.com" required />
                    </div>
                  </div>
                </Section>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: "100%", padding: "14px", fontSize: "1rem", marginTop: "8px" }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  Creating Account…
                </span>
              ) : "Create Account"}
            </button>

            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.88rem", marginTop: "20px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}>Sign in →</Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default SignUp;
