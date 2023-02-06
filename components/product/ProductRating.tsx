import { Rating } from 'react-simple-star-rating';

interface ProductRatingProps {
  rating?: number;
  starSize?: number;
}

export default function ProductRating({ rating = 5, starSize = 26 }: ProductRatingProps) {
  return (
    <Rating
      initialValue={rating}
      SVGclassName="inline-block"
      fillColor="orange"
      allowFraction
      readonly
      size={starSize}
    />
  );
}
