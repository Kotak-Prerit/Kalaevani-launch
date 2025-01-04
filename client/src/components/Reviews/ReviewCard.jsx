import React from "react";
import ReactStars from "react-stars";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "#333",
    activeColor: "#fff",
    value: review.rating,
    isHalf: true,
    size: 25,
  };

  const createdAt = new Date(review.reviewedAt);

  const formattedDate = createdAt.toLocaleDateString("en-GB");

  return (
    <div className="reviewCard poppins">
      <div className="user-info-container">
        <div className="nameAndReview">
          <div className="flex reviewNameDate">
            <p className="reviewName montserrat">{review.name}</p>
            <p className="reviewedAt Apercu">{formattedDate}</p>
          </div>
          <div className="flex-center gap-1 ratingStars">
            <ReactStars {...options} />
            {review.rating} stars
          </div>
        </div>
      </div>
      <span className="comment">
        {" "}
        <span className="feedback"> Feedback : </span> {review.comment}
      </span>
    </div>
  );
};

export default ReviewCard;
