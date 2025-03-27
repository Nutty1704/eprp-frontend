import React from 'react';
import Header from './Header';
import ReviewCard from './ReviewCard';
import RatingBreakdown from './RatingBreakdown';

const ReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      restaurantName: 'Lorem Ipsum',
      reviewDate: '27 March, 2025',
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus felis at aliquet rhoncus. Cras non eros ac tellus placerat fermentum. Quisque hendrerit ligula est. Nunc nec condimentum purus. In vehicula maximus bibendum. Suspendisse varius, lectus finibus bibendum posuere, odio massa faucibus orci, nec feugiat sem ante a urna.',
      overallRating: 3.7,
      foodRating: 3.5,
      serviceRating: 4,
      valueRating: 3.5,
      likeCount: 21
    },
    {
      id: 2,
      restaurantName: 'Lorem Ipsum',
      reviewDate: '27 March, 2025',
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus felis at aliquet rhoncus. Cras non eros ac tellus placerat fermentum. Quisque hendrerit ligula est. Nunc nec condimentum purus. In vehicula maximus bibendum. Suspendisse varius, lectus finibus bibendum posuere, odio massa faucibus orci, nec feugiat sem ante a urna.',
      overallRating: 4.5,
      foodRating: 4.5,
      serviceRating: 4.2,
      valueRating: 4,
      likeCount: 34
    }
  ];

  const calculateAverage = (key) => {
    const sum = reviews.reduce((total, review) => total + review[key], 0);
    return sum / reviews.length;
  };

  const getRatingCounts = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    reviews.forEach(review => {
      const roundedRating = Math.round(review.overallRating);
      counts[roundedRating] = (counts[roundedRating] || 0) + 1;
    });
    
    return counts;
  };

  const ratingData = {
    averageRating: calculateAverage('overallRating'),
    totalReviews: reviews.length,
    ratingCounts: getRatingCounts(),
    growthText: "Recent reviews for Lorem Ipsum"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isAuthenticated={true} />
      
      <div className="flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-2xl mb-8">
          <h1 className="text-2xl font-bold mb-4">Lorem Ipsum Reviews</h1>
          
          {/* Rating Breakdown Component */}
          <RatingBreakdown 
            averageRating={ratingData.averageRating}
            totalReviews={ratingData.totalReviews}
            ratingCounts={ratingData.ratingCounts}
            growthText={ratingData.growthText}
          />
        </div>
        
        <div className="flex flex-col items-center py-8 px-8 ">
          <div className="space-y-6">
            {reviews.map(review => (
              <ReviewCard
                key={review.id}
                restaurantName={review.restaurantName}
                reviewDate={review.reviewDate}
                reviewText={review.reviewText}
                overallRating={review.overallRating}
                foodRating={review.foodRating}
                serviceRating={review.serviceRating}
                valueRating={review.valueRating}
                likeCount={review.likeCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;