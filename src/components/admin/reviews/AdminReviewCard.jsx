import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, Star, User, Send, Edit, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import Rating from '@/src/components/ui/Rating';
import { reviewIcons } from '@/src/config/Icons';
import { createResponse } from '@/src/lib/api/review';
import { toast } from 'sonner';

const OwnerReviewCard = ({
  review,
  restaurantName = "ABC",
  onReplySubmit,
  onEditReply
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState(review.response?.text || '');

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    onReplySubmit(review.id, replyText);
    setIsReplying(false);
    setReplyText('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(review.response?.text || '');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmitEdit = () => {
    if (!editText.trim()) return;
    onEditReply(review.id, review.response.id, editText);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    const { success, error, data, message } = await createResponse(review._id, editText);

    if (error || !success) {
        if (!message) toast.error('Failed to reply', { position: 'top-center' });
        else toast.error(message, { position: 'top-center' });
    }

    if (success) {
        review.response = data;
    }
  }

  return (
    <div className="bg-slate-100 rounded-lg shadow-md mb-4 max-w-6xl w-full inter-regular overflow-hidden">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className='flex items-center min-w-1/2 justify-between gap-3'>
            <h3 className="text-xl font-semibold rubik-bold">{restaurantName}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-primary fill-primary mr-1" />
              <span className="text-primary text-sm font-medium">{review.rating?.toFixed(2)}/5</span>
            </div>
          </div>
          <span className="text-gray-600 font-medium text-xs ml-2">
            {format(new Date(review.createdAt), 'd MMMM yyyy')}
          </span>
        </div>

        <p className="text-gray-700 my-3">{review.text}</p>

        <div className="space-y-1.5">
          <Rating
            asInt={true}
            rating={review.foodRating}
            prefix={`Food ${reviewIcons.food}`}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
          <Rating
            asInt={true}
            rating={review.serviceRating}
            prefix={`Service ${reviewIcons.service}`}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
          <Rating
            asInt={true}
            rating={review.ambienceRating}
            prefix={`Ambience ${reviewIcons.ambience}`}
            textClass="text-sm"
            prefixClass="font-medium min-w-24"
            iconClass="h-4 w-4"
          />
        </div>

        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex items-center inter-medium gap-1.5">
            <Heart className='h-5 w-5 fill-primary text-primary' />
            <span>{review.upvotes}</span>
          </div>
          
          {!review.response && !isReplying && (
            <button 
              onClick={handleReply}
              className="text-sm px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Reply
            </button>
          )}
        </div>
      </div>

      {/* Owner's Response (View Mode) */}
      {review.response && !isEditing && (
        <div className="bg-blue-50 border-l-4 border-primary mt-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <User className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium text-sm text-primary">Your Response</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs">
                  {format(new Date(review.response.updatedAt), 'd MMMM yyyy')}
                </span>
                <button 
                  onClick={handleEdit}
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
            <p className="text-gray-700 inter-regular text-sm">
              {review.response.text}
            </p>
          </div>
        </div>
      )}

      {/* Reply Input */}
      {isReplying && (
        <div className="bg-white border-t p-4">
          <div className="flex items-center mb-2">
            <User className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium text-sm">Add your response</span>
          </div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your response to this review..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary min-h-24 text-sm"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button 
              onClick={handleCancelReply}
              className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!replyText.trim()}
              className={`px-3 py-1.5 rounded-md text-sm bg-primary text-white hover:bg-primary/90 flex items-center gap-1.5
                ${!replyText.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Send className="h-3.5 w-3.5" />
              Submit Response
            </button>
          </div>
        </div>
      )}

      {/* Edit Response */}
      {isEditing && (
        <div className="bg-white border-t p-4">
          <div className="flex items-center mb-2">
            <Edit className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium text-sm">Edit your response</span>
          </div>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary min-h-24 text-sm"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button 
              onClick={handleCancelEdit}
              className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!editText.trim()}
              className={`px-3 py-1.5 rounded-md text-sm bg-primary text-white hover:bg-primary/90 flex items-center gap-1.5
                ${!editText.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Check className="h-3.5 w-3.5" />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

OwnerReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  restaurantName: PropTypes.string,
  onReplySubmit: PropTypes.func.isRequired,
  onEditReply: PropTypes.func.isRequired
};

export default OwnerReviewCard;