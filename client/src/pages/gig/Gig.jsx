import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import newRequest from "../../utils/newRequest.js";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Reviews from "../../components/reviews/Reviews.jsx";

function Gig() {
  const { id } = useParams();

  // Fetch gig data
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  // Extract userId only if data is available
  const userId = data?.userId;

  // Fetch user data
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId, // Only fetch user data if userId is available
  });

  // Handle loading and error states for gig data
  if (isLoading) return <div>Loading gig data...</div>;
  if (error) return <div>Error loading gig data</div>;

  // Handle loading and error states for user data
  if (isLoadingUser) return <div>Loading user data...</div>;
  if (errorUser) return <div>Error loading user data</div>;

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            Fiverr {">"} Graphics & Design {">"}
          </span>
          <h1>{data?.title || "Gig Title"}</h1>
          <div className="user">
            <img
              className="pp"
              src={dataUser?.img || "/img/noavatar.jpg"}
              alt="User Avatar"
            />
            <span>{dataUser?.username || "Unknown User"}</span>
            {!isNaN(data?.totalStars / data?.starNumber) && (
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber))
                  .fill()
                  .map((_, i) => (
                    <img src="/img/star.png" alt="Star" key={i} />
                  ))}
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
              </div>
            )}
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {data?.images?.map((img) => (
              <img key={img} src={img} alt="Gig Slide" />
            ))}
          </Slider>
          <h2>About This Gig</h2>
          <p>{data?.desc || "Description not available"}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={dataUser?.img || "/img/noavatar.jpg"}
                alt="User Avatar"
              />
              <div className="info">
                <span>{dataUser?.username || "Unknown User"}</span>
                {!isNaN(data?.totalStars / data?.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((_, i) => (
                        <img src="/img/star.png" alt="Star" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser?.country || "N/A"}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>{dataUser?.desc || "No description available"}</p>
            </div>
          </div>
          <Reviews gigId={id} />
        </div>
        <div className="right">
          <div className="price">
            <h3>{data?.shortTitle || "Short Title"}</h3>
            <h2>$ {data?.price || "0.00"}</h2>
          </div>
          <p>{data?.shortDesc || "Short Description not available"}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="Delivery Time" />
              <span>{data?.deliveryDate || 0} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="Revisions" />
              <span>{data?.revisionNumber || 0} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data?.features?.map((feature) => (
              <div className="item" key={feature}>
                <img src="/img/greencheck.png" alt="Feature" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
    
    </div>
  );
}

export default Gig;
