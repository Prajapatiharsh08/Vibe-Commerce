# E-Commerce Frontend Setup Guide

## Project Structure

\`\`\`
src/
├── pages/
│   ├── Products.tsx         # Products listing page
│   ├── Cart.tsx             # Shopping cart page
│   ├── Checkout.tsx         # Checkout page
│   └── AddProduct.tsx       # Add new product page
├── components/
│   ├── ProductCard.tsx      # Product card component
│   └── Navbar.tsx           # Navigation bar
├── services/
│   ├── productService.ts    # Product API calls
│   ├── cartService.ts       # Cart API calls
│   └── orderService.ts      # Order API calls
├── context/
│   └── CartContext.tsx      # Cart state management
├── config/
│   └── api.ts               # API configuration
├── data/
│   └── products.ts          # Mock product data
└── types/
    └── product.ts           # TypeScript types
\`\`\`

## Installation & Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Create a `.env.local` file:

\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

For production:
\`\`\`env
VITE_API_URL=https://your-backend-domain.com/api
\`\`\`

### 3. Start Frontend Development Server
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on `http://localhost:5173`

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`

## Features

- **Product Management**: View, search, and add products
- **Shopping Cart**: Add items, update quantities, remove items
- **Checkout**: Complete purchase with customer information
- **Order Management**: Track orders by email
- **Responsive Design**: Works on all device sizes
- **Toast Notifications**: User feedback for actions

## How It Works

### 1. Products Page
- Fetches products from backend API
- Displays products in a grid layout
- Users can add products to cart
- Link to add new products

### 2. Cart Page
- Shows all items in the cart
- Users can update quantities or remove items
- Displays order summary with total price
- Link to checkout

### 3. Checkout Page
- Shows order summary
- Collects customer information (name, email)
- Validates input
- Creates order in backend
- Clears cart after successful order

### 4. Add Product Page
- Form to create new product
- Uploads product details to backend
- Validates all required fields
- Redirects to products page on success

## State Management

The app uses:
- **Context API**: Cart state management via `CartContext`
- **Local Storage**: Persistent cart and product data
- **React Query**: Data fetching and caching (ready to integrate)
- **Service Layer**: Centralized API calls

## Backend Connection

All API calls go through service files in `src/services/`:
- Services use the `API_ENDPOINTS` from `src/config/api.ts`
- Automatic fallback to mock data if backend is unavailable
- Local storage sync for offline support

## Running Both Frontend and Backend

Open two terminal windows:

**Terminal 1 - Backend:**
\`\`\`bash
npm run dev:backend
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
npm run dev
\`\`\`

Access the app at `http://localhost:5173`

## Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variable `VITE_API_URL` to production backend URL
4. Deploy

### Backend (Render/Railway/Heroku)
1. Push backend code to GitHub
2. Connect repository to hosting platform
3. Set environment variable `MONGODB_URI`
4. Deploy

Update frontend `VITE_API_URL` to point to deployed backend.

## Troubleshooting

### Backend not connecting
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env.local`
- Check CORS settings in backend `server.js`
- Check browser console for error messages

### Products not loading
- Verify MongoDB connection string
- Check backend logs for errors
- Ensure backend is running
- Check network tab in browser DevTools

### Cart not syncing
- Clear browser localStorage
- Restart both frontend and backend
- Check if userId is being generated correctly





# E-Commerce Backend Setup Guide

## Project Structure

\`\`\`
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   ├── Product.js           # Product schema
│   ├── Cart.js              # Cart schema
│   └── Order.js             # Order schema
├── controllers/
│   ├── productController.js # Product business logic
│   ├── cartController.js    # Cart business logic
│   └── orderController.js   # Order business logic
├── routes/
│   ├── productRoutes.js     # Product API endpoints
│   ├── cartRoutes.js        # Cart API endpoints
│   └── orderRoutes.js       # Order API endpoints
└── server.js                # Main server file
\`\`\`

## Installation & Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb+srv://prajapatiharsh08:harsh875@cluster0.y2orx.mongodb.net/?appName=Cluster0
PORT=5000
NODE_ENV=development
\`\`\`

### 3. Start Backend Server
\`\`\`bash
# Development mode with auto-reload
npm run dev:backend

# Production mode
npm run start:backend
\`\`\`

The backend will run on `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/:userId/:productId` - Add to cart
- `PUT /api/cart/:userId/:productId` - Update cart item quantity
- `DELETE /api/cart/:userId/:productId` - Remove from cart
- `DELETE /api/cart/:userId` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/email/:email` - Get orders by email

## Database Schemas

### Product Schema
\`\`\`javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  image: String (required),
  category: String (enum: ['electronics', 'clothing', 'food', 'home', 'other']),
  stock: Number (default: 100),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
\`\`\`

### Cart Schema
\`\`\`javascript
{
  userId: String (unique, required),
  items: [
    {
      productId: ObjectId (ref: Product),
      name: String,
      price: Number,
      image: String,
      description: String,
      quantity: Number (min: 1)
    }
  ],
  totalPrice: Number (default: 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
\`\`\`

### Order Schema
\`\`\`javascript
{
  orderNumber: String (unique, required),
  customerName: String (required),
  customerEmail: String (required),
  items: Array,
  totalAmount: Number (required),
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered']),
  paymentStatus: String (enum: ['pending', 'completed', 'failed']),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
\`\`\`

## Frontend Integration

The frontend is configured to connect to the backend via API services located in `src/services/`:
- `productService.ts` - Product operations
- `cartService.ts` - Cart operations
- `orderService.ts` - Order operations

Frontend environment variable:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

For production, update this to your deployed backend URL.

## CORS Configuration

The backend has CORS enabled to allow requests from the frontend. Make sure both frontend and backend are running correctly for seamless integration.

## Testing the API

Use Postman or curl to test endpoints:

\`\`\`bash
# Get all products
curl http://localhost:5000/api/products

# Add product to cart
curl -X POST http://localhost:5000/api/cart/user123/productId123 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 1}'

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }'
