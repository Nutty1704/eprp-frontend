# TasteMonash Frontend

A React-based web application for discovering and reviewing restaurants around Monash University. TasteMonash allows users to browse restaurants, post anonymous reviews, and discover dining options through an intuitive, responsive interface.

## Features

### For Customers
- Browse restaurants with search and filtering capabilities
- Post anonymous reviews with multi-criteria ratings (food, ambience, service)
- Upload images with reviews
- View restaurant details and deals

### For Business Owners
- Secure owner portal with authentication
- Add and manage restaurant listings
- Upload restaurant images and promotional content
- Create and manage deals/promotions
- View and respond to customer reviews

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Build Tool**: Vite

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend API server running (see [backend repository](https://github.com/Nutty1704/eprp-backend))

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eprp-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.sample .env
```

4. Configure environment variables in `.env`:

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

Create a production build:
```bash
npm run build
```

## Key Components

### Authentication
- Role-based access control (customers vs business owners)
- Secure session management with encrypted cookies
- Automatic redirects between customer and owner portals

### Review System
- Anonymous review posting
- Multi-criteria rating system
- Image upload capabilities
- Pagination for large review lists

### Search & Filtering
- Dynamic restaurant search
- Multiple filtering options (cuisine, rating, etc)
- Real-time search results

## Responsive Design

The application implements mobile-first responsive design:
- Adaptive layouts for different screen sizes
- Mobile-specific components (hamburger navigation)
- Touch-friendly interfaces
- Optimized mobile user experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch from `main`
2. Follow existing code style and component patterns
3. Ensure responsive design principles are maintained
4. Test across supported browsers
5. Submit pull request with clear description
