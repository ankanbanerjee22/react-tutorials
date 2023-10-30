const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = Array.from({ length: 10 }, (_, index) => {
    if (index < filledStars) {
      return <i key={index} className="material-icons yellow-text">star</i>;
    } else if (hasHalfStar && index === filledStars) {
      return <i key={index} className="material-icons yellow-text">star_half</i>;
    } else {
          return <i key={index} className="material-icons grey-text">star_outline</i>;
    }
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
