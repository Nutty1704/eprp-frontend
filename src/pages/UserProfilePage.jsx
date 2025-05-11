import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import ReviewDeck from '../components/review/ReviewDeck';
import { getCustomer } from '../lib/api/user';
import useAuthStore from '../stores/auth-store';
import EditProfileDialog from '../components/profile/EditProfileDialog';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const { user } = useAuthStore();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getCustomer();
        const data = await response.data;
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  
  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  const handleProfileUpdate = (updatedUserData) => {
    setUserData(updatedUserData);
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Profile section */}
      <div className="flex flex-col items-center pt-16 py-8">
        <div className="relative">
          <div className="bg-white rounded-full overflow-hidden h-40 w-40 shadow-md mb-4">
            <img
              src={userData.profile_image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          
          <EditProfileDialog userData={userData} onProfileUpdate={handleProfileUpdate}>
            <Button
              className="absolute bottom-4 right-0 rounded-full bg-primary hover:brightness-90 p-0 h-11 w-11 shadow-md flex items-center justify-center"
              size="sm"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </EditProfileDialog>
        </div>
        
        <h1 className="text-2xl font-bold mt-4 rubik-bold">{userData.name}</h1>
        <p className="text-gray-600 mt-1">{userData.bio}</p>
        
        <div className="flex items-center mt-2">
          <span className="text-primary font-semibold">{userData.review_count} Reviews</span>
        </div>
      </div>

      <ReviewDeck/>
    </div>
  );
};

export default UserProfile;