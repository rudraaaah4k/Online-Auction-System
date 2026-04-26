import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useMemo, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const auctionImage = useMemo(() => {
    const imageUrl = auctionDetail.image?.url;
    return imageUrl && !String(imageUrl).startsWith("data:image/svg+xml")
      ? imageUrl
      : "/imageHolder.jpg";
  }, [auctionDetail.image?.url]);

  const isLive =
    auctionDetail.startTime &&
    auctionDetail.endTime &&
    Date.now() >= new Date(auctionDetail.startTime) &&
    Date.now() <= new Date(auctionDetail.endTime);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [dispatch, id, isAuthenticated, navigateTo]);

  return (
    <section className="page-content relative">
      <div
        className="orb"
        style={{
          width: "300px",
          height: "300px",
          top: "-50px",
          right: "-80px",
          background: "rgba(214,72,43,0.10)",
        }}
      />
      <div
        className="orb"
        style={{
          width: "220px",
          height: "220px",
          bottom: "20px",
          left: "-60px",
          background: "rgba(201,168,76,0.10)",
          animationDelay: "-4s",
        }}
      />

      <div className="relative z-10 mb-6 flex flex-wrap items-center gap-2 text-[16px] text-[var(--muted)]">
        <Link
          to="/"
          className="font-semibold transition-all duration-300 hover:text-[var(--gold)]"
        >
          Home
        </Link>
        <FaGreaterThan className="text-[var(--muted)]" />
        <Link
          to="/auctions"
          className="font-semibold transition-all duration-300 hover:text-[var(--gold)]"
        >
          Auctions
        </Link>
        <FaGreaterThan className="text-[var(--muted)]" />
        <p className="text-[var(--text)]">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="glass-card p-5 sm:p-6 flex flex-col gap-5 animate-fade-up">
            <div className="flex gap-4 flex-col lg:flex-row lg:items-stretch">
              <div className="flex min-h-[240px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-3 lg:w-[320px]">
                <img
                  src={auctionImage}
                  alt={auctionDetail.title || "Auction item"}
                  className="h-full w-full max-h-[340px] rounded-xl object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "/imageHolder.jpg";
                  }}
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <span className="section-badge">Auction Details</span>
                  <h3 className="mb-3 text-2xl font-semibold text-[var(--text)] sm:text-3xl lg:text-4xl">
                    {auctionDetail.title}
                  </h3>
                  <p className="text-lg text-[var(--muted)]">
                    Condition: <span className="font-semibold text-[var(--gold)]">{auctionDetail.condition}</span>
                  </p>
                  <p className="text-lg text-[var(--muted)]">
                    Minimum Bid: <span className="font-semibold text-[var(--gold)]">Rs. {auctionDetail.startingBid}</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[rgba(201,168,76,0.06)] p-4 text-sm text-[var(--muted)]">
                  This item is listed in a premium layout for better readability and image visibility.
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xl font-bold text-[var(--text)]">Auction Item Description</p>
              <hr className="my-3 border-t border-[var(--border)]" />
              <ul className="space-y-3">
                {auctionDetail.description &&
                  auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index} className="text-[17px] leading-7 text-[var(--text)]/90">
                      {element}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="glass-card overflow-hidden animate-fade-up delay-100">
            <header className="border-b border-[var(--border)] bg-[rgba(201,168,76,0.08)] px-5 py-4 text-2xl font-semibold tracking-wide text-[var(--text)]">
              BIDS
            </header>

            <div className="min-h-[420px] bg-[var(--surface)] px-5 py-4">
              {auctionBidders && isLive ? (
                auctionBidders.length > 0 ? (
                  <div className="space-y-3">
                    {auctionBidders.map((element, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={element.profileImage}
                            alt={element.userName}
                            className="hidden h-12 w-12 rounded-full border border-[var(--border)] object-cover md:block"
                          />
                          <p className="text-[16px] font-semibold text-[var(--text)]">{element.userName}</p>
                        </div>
                        <p className="text-[16px] font-medium text-[var(--muted)]">Rs. {element.amount}</p>
                        <p className={`text-[16px] font-semibold ${index === 0 ? "text-green-400" : index === 1 ? "text-sky-400" : index === 2 ? "text-yellow-400" : "text-[var(--muted)]"}`}>
                          {index === 0 ? "1st" : index === 1 ? "2nd" : index === 2 ? "3rd" : `${index + 1}th`}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)]">
                    No bids for this auction yet
                  </div>
                )
              ) : auctionDetail.startTime && Date.now() < new Date(auctionDetail.startTime) ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="w-full max-h-[420px] rounded-xl object-cover"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="w-full max-h-[420px] rounded-xl object-cover"
                />
              )}
            </div>

            <div className="border-t border-[var(--border)] bg-[rgba(214,72,43,0.12)] px-5 py-4">
              {isLive ? (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <p className="text-[var(--text)] font-semibold">Place Bid</p>
                    <input
                      type="number"
                      className="field w-32 bg-[var(--surface)]"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn-primary rounded-full px-5 py-4 text-lg"
                    onClick={handleBid}
                  >
                    <RiAuctionFill />
                  </button>
                </div>
              ) : auctionDetail.startTime && new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-lg font-semibold text-[var(--text)]">Auction has not started yet!</p>
              ) : (
                <p className="text-lg font-semibold text-[var(--text)]">Auction has ended!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
