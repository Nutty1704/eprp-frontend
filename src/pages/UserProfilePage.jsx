import React, { useState, useEffect } from 'react';
import ReviewCard from '../components/review/ReviewCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Download, Settings } from 'lucide-react';

// Dummy user data
const dummyUser = {
  _id: "user123",
  name: "Andrew Ho",
  bio: "No bio added yet",
  review_count: 19,
  profile_image: "..."
};

// Dummy reviews data following your schema
const dummyReviews = [
  {
    _id: "review1",
    businessId: "business1",
    businessName: "El Sabor Mexicano",
    customerId: "user123",
    text: "El Sabor Mexicano has a nice, cozy atmosphere and friendly staff, but the food was a bit hit or miss. The tacos were flavorful, but the portions felt small for the price. Service was decent, though a bit slow during peak hours. Overall, a good spot, but not my top pick!",
    rating: 3.7,
    foodRating: 3.5,
    serviceRating: 3,
    ambienceRating: 3.5,
    upvotes: 21,
    createdAt: "2025-03-02T10:30:00.000Z"
  },
  {
    _id: "review2",
    businessId: "business2",
    businessName: "The Green Fork",
    customerId: "user123",
    text: "The Green Fork offers a cozy atmosphere with a focus on healthy, organic food. The salads were fresh, but the pasta was a bit bland. The service was friendly, though there was a slight wait during lunchtime. A good choice if you're looking for clean eating!",
    rating: 3.5,
    foodRating: 4,
    serviceRating: 3,
    ambienceRating: 3.5,
    upvotes: 8,
    createdAt: "2025-02-24T14:20:00.000Z"
  },
  {
    _id: "review3",
    businessId: "business3",
    businessName: "Thai Spice",
    customerId: "user123",
    text: "Thai Spice has an amazing selection of authentic dishes. The Tom Yum soup was exceptional, with the perfect balance of spicy and sour. Service was prompt and attentive. The restaurant has a lovely ambience with traditional decorations. Highly recommend their Pad Thai!",
    rating: 4.5,
    foodRating: 5,
    serviceRating: 4,
    ambienceRating: 4.5,
    upvotes: 15,
    createdAt: "2025-01-15T19:45:00.000Z"
  },
];

const UserProfile = () => {
  const [user, setUser] = useState(dummyUser);
  const [reviews, setReviews] = useState(dummyReviews);
  const [activeTab, setActiveTab] = useState("all-reviews");

  const likedReviews = [...reviews].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Profile section */}
      <div className="flex flex-col items-center py-8">
        <div className="bg-white rounded-full border-4 border-white overflow-hidden h-32 w-32 shadow-md">
          {/* Image here */}
        </div>
        
        <h1 className="text-2xl font-bold mt-4 rubik-bold">{user.name}</h1>
        <p className="text-gray-600 mt-1">{user.bio}</p>
        
        <div className="flex items-center mt-2">
          <span className="text-primary font-semibold">{user.review_count}</span>
        </div>

        <div className="flex space-x-4 mt-2">
          <button className="p-2 rounded-full bg-gray-200">
            <Download className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs section */}
      <div className="bg-white">
        <Tabs defaultValue="all-reviews" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto px-4">
          <TabsList className="flex w-full mb-4 border-b border-gray-200">
            <TabsTrigger value="all-reviews" className="flex items-center justify-center gap-2 px-6 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary">
              All Reviews
            </TabsTrigger>
            <TabsTrigger value="most-liked" className="flex items-center justify-center gap-2 px-6 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary">
              Most Liked
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Reviews section */}
      <div className="bg-gray-50 flex-grow pb-12">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="bg-white rounded-lg shadow p-4 -mt-4">
            {activeTab === "all-reviews" ? (
              reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map(review => (
                    <ReviewCard 
                      key={review._id} 
                      review={review} 
                      restaurantName={review.businessName}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p>No reviews yet.</p>
                </div>
              )
            ) : (
              likedReviews.length > 0 ? (
                <div className="space-y-6">
                  {likedReviews.map(review => (
                    <ReviewCard 
                      key={review._id} 
                      review={review} 
                      restaurantName={review.businessName}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p>No liked reviews yet.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;