import React from 'react';
import Header from './Header';
import ReviewCard from './ReviewCard';

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
      serviceRating: 4.5,
      valueRating: 4,
      likeCount: 34
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isAuthenticated={true} />
      
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
  );
};

export default ReviewsPage;