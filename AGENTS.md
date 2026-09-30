# Project Information - Lizi Mulambo Website

## Project Overview
Website for Lizi Mulambo, a personal development coach and author of "Cicatrizes e Coroas — Uma história de superação". The site features book sales via WhatsApp integration and an admin panel for content management.

## Tech Stack
- **Frontend**: Vue 3, Vite, Vue Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT with bcrypt
- **Security**: Helmet, Express Rate Limit, Express Validator

## Development Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server (with nodemon)
npm start            # Start production server
npm run seed         # Seed database with initial data
npm run setup-admin  # Create first administrator
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
```

## Environment Setup

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lizi-mulambo
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Key Features Implementation

### WhatsApp Integration
- Phone: +258 85 767 0109
- Base link: https://wa.me/258857670109
- Dynamic order messages with book title and quantity
- Floating WhatsApp button on all pages

### Admin Panel
- Protected routes with JWT authentication
- Book management (CRUD operations)
- Author information management
- Image upload for book covers and author photo
- Featured book selection
- Publish/unpublish functionality

### SEO & Accessibility
- Meta tags per page
- Open Graph tags
- Structured data (Schema.org)
- Keyboard navigation
- ARIA labels
- Focus states
- Alt text for images

## Database Models

### Book
- title, subtitle, author
- synopsis, format, price, currency
- availability, coverImage
- featured, published, slug
- createdAt, updatedAt

### Admin
- username, password (hashed)
- email
- createdAt, lastLogin

### Author
- name, shortBio, fullBio
- photo, facebook, instagram
- whatsapp, whatsappLink
- createdAt, updatedAt

## Important Notes

### Content to be Added Later
- Official book cover image (placeholder currently used)
- Author photo (placeholder currently used)
- Full biography
- Official synopsis
- Price in MZN
- Delivery conditions
- Additional books in the future

### Security Considerations
- Never commit .env files
- Change JWT_SECRET in production
- Use strong passwords for admin
- Keep dependencies updated
- Implement HTTPS in production

### Design System
- Colors: White/Ivory background (#FFFAF0), Black text (#1a1a1a), Gold accents (#D4AF37)
- Fonts: Georgia (serif) for headings, readable sans-serif for body
- Spacing: Generous whitespace between elements
- Mobile-first responsive design
- Subtle animations

## API Endpoints

### Public
- GET /api/books - Get all published books
- GET /api/books/featured - Get featured book
- GET /api/books/:slug - Get book by slug
- GET /api/author - Get author information

### Admin (Protected)
- POST /api/admin/login - Admin login
- GET /api/admin/profile - Get admin profile
- POST /api/admin/setup - Create first admin (one-time)
- GET /api/books/admin/all - Get all books (including unpublished)
- POST /api/books/admin - Create book
- PUT /api/books/admin/:id - Update book
- DELETE /api/books/admin/:id - Delete book
- PUT /api/author/admin - Update author information
- POST /api/upload/cover - Upload book cover
- POST /api/upload/author-photo - Upload author photo

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check MONGODB_URI in .env
- Verify MongoDB is accessible on the specified port

### CORS Issues
- Backend CORS is configured to allow all origins in development
- In production, specify allowed origins

### Build Issues
- Clear node_modules and reinstall: rm -rf node_modules && npm install
- Clear Vite cache: rm -rf .cache

### Image Upload Issues
- Ensure uploads directory exists
- Check file size limit (5MB)
- Verify allowed file types (jpeg, jpg, png, webp)
