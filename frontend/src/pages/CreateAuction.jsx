import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const panelClass = "glass-card";

  return (
    <article className="page-content relative">
      <div className="orb" style={{ width: "320px", height: "320px", top: "-40px", right: "-70px", background: "rgba(214,72,43,0.11)" }} />
      <div className="orb" style={{ width: "220px", height: "220px", bottom: "20px", left: "-80px", background: "rgba(201,168,76,0.10)", animationDelay: "-4s" }} />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="mb-8 animate-fade-up">
          <span className="section-badge">Auctioneer Tools</span>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-[var(--text)]">Create Auction</h1>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Add an item with clear details, a strong image, and an exact schedule.
          </p>
        </div>

        <div className={`${panelClass} p-5 sm:p-8 animate-fade-up delay-100`}>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleCreateAuction}>
            <div>
              <p className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-5">Auction Detail</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="field" placeholder="Vintage camera set" />
                </div>
                <div>
                  <label className="field-label">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="field">
                    <option value="">Select Category</option>
                    {auctionCategories.map((element) => <option key={element} value={element}>{element}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">Condition</label>
                  <select value={condition} onChange={(e) => setCondition(e.target.value)} className="field">
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Starting Bid</label>
                  <input type="number" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} className="field" placeholder="10000" />
                </div>
              </div>
            </div>

            <div>
              <label className="field-label">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="field min-h-[180px] resize-y" rows={8} placeholder="Describe the item, condition, and key details..." />
            </div>

            <div>
              <p className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-5">Auction Timing</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">Auction Starting Time</label>
                  <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat={"MMMM d, yyyy h:mm aa"} className="field w-full" />
                </div>
                <div>
                  <label className="field-label">Auction End Time</label>
                  <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat={"MMMM d, yyyy h:mm aa"} className="field w-full" />
                </div>
              </div>
            </div>

            <div>
              <label className="field-label">Auction Item Image</label>
              <label htmlFor="dropzone-file" className="group flex flex-col items-center justify-center w-full min-h-[240px] rounded-2xl border border-dashed border-[var(--gold-dark)] bg-[var(--surface2)]/70 cursor-pointer transition-all duration-300 hover:border-[var(--gold)] hover:bg-[rgba(201,168,76,0.08)]">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt={title || "Auction preview"} className="w-full max-w-md rounded-xl border border-[var(--border)] object-cover shadow-2xl" />
                  ) : (
                    <>
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold-dark)] bg-[rgba(201,168,76,0.08)] text-[var(--gold)] text-2xl font-bold">
                        +
                      </div>
                      <p className="text-lg font-semibold text-[var(--text)]">Click to upload or drag and drop</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">PNG, JPG, WEBP or GIF</p>
                    </>
                  )}
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={imageHandler} />
              </label>
            </div>

            <button className="btn-primary w-full sm:w-auto sm:min-w-[240px] mx-auto text-base sm:text-lg py-3">
              {loading ? "Creating Auction..." : "Create Auction"}
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default CreateAuction;
