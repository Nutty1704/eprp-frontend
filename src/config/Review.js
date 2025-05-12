export const createSuccessMessages = [
    "We appreciate your opinion! Your feedback helps others make great choices.",
    "Thank you for your review! Your insights make a difference.",
    "Your review has been posted! Keep sharing your experiences with us.",
    "Thanks for your feedback! Every review helps build a better community.",
    "Your voice matters! We’re grateful for your contribution.",
    "Review posted successfully! We'd love to hear from you again soon.",
    "Your thoughts are valuable! Thanks for taking the time to share them.",
    "Thank you for reviewing! Keep sharing your experiences with us.",
    "Your feedback is gold! We appreciate your time and effort.",
    "Thanks for your review! Helping others has never been easier.",
    "You rock! Thanks for taking the time to leave a review.",
    "Your experience matters! Thanks for sharing it with us.",
    "Your review is live! Others will surely find it helpful.",
];


export const SORT_OPTIONS = [
  { 
    label: 'Newest', 
    value: { field: 'createdAt', direction: 'desc' },
    icon: '↓'
  },
  { 
    label: 'Oldest', 
    value: { field: 'createdAt', direction: 'asc' },
    icon: '↑'
  },
  { 
    label: 'Highest Rating', 
    value: { field: 'rating', direction: 'desc' },
    icon: '↓'
  },
  { 
    label: 'Lowest Rating', 
    value: { field: 'rating', direction: 'asc' },
    icon: '↑'
  },
  { 
    label: 'Most Upvoted', 
    value: { field: 'upvotes', direction: 'desc' },
    icon: '↓'
  }
];
