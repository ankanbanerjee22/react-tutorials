import React from 'react';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = Array.from({ length: 10 }, (_, index) => {
    if (index < filledStars) {
      return <i key={index} className="material-icons yellow-text">star</i>;
    } if (hasHalfStar && index === filledStars) {
      return <i key={index} className="material-icons  yellow-text">star_half</i>;
    }
    return <i key={index} className="material-icons grey-text" style={{ opacity: '0.2' }}>star_outline</i>;
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
