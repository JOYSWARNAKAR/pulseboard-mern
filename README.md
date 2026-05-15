# PulseBoard - Full Stack Polling Platform

PulseBoard is a comprehensive polling and survey platform built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create polls, share them publicly, collect responses, and view real-time analytics.

## Features

### Core Features
- 🎯 **Easy Poll Creation**: Create polls with multiple questions and customizable options
- 🔐 **Authentication**: Secure user registration and login with JWT
- 👥 **Anonymous & Authenticated Responses**: Choose response collection mode
- ⏰ **Poll Expiry System**: Set automatic expiration dates for polls
- ✅ **Mandatory & Optional Questions**: Control question requirements
- 📊 **Real-time Analytics**: Live updates using Socket.io WebSockets
- 📈 **Comprehensive Dashboard**: View and manage your polls
- 🔗 **Shareable Links**: Generate and share unique poll links
- 📑 **Public Results**: Publish and share poll results
- 📱 **Responsive Design**: Works on desktop and mobile devices

### Technical Features
- Single-option selection questions (radio buttons)
- Response validation on both frontend and backend
- Real-time response count updates
- Analytics calculations and caching
- Protected routes and API endpoints
- Error handling and validation

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Bcrypt** - Password hashing

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.io Client** - Real-time updates
- **Chart.js** - Data visualization
- **CSS** - Styling

## Project Structure

```
pulseboard-mern/
├── backend/
│   ├── config/              # Database and configuration
│   ├── models/              # Mongoose schemas (User, Poll, Response, Analytics)
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, validation, error handling
│   ├── utils/               # Helper functions
│   ├── websocket/           # Socket.io handlers
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   ├── .env.example         # Environment variables template
│   └── .gitignore
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (Auth)
│   │   ├── hooks/           # Custom hooks
│   │   ├── api/             # API client
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # CSS files
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── package.json         # Frontend dependencies
│   ├── .env.example         # Environment variables template
│   └── .gitignore
│
├── .github/
│   └── copilot-instructions.md
│
└── README.md                # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```
   MONGODB_URI=mongodb://localhost:27017/pulseboard
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB:**
   ```bash
   # On Windows
   mongod

   # On macOS
   brew services start mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

5. **Start the frontend development server:**
   ```bash
   npm start
   ```

   The app will open on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Polls
- `POST /api/polls/create` - Create new poll (protected)
- `GET /api/polls/my-polls` - Get user's polls (protected)
- `GET /api/polls/public/:shareUrl` - Get poll by share URL (public)
- `GET /api/polls/:pollId` - Get poll details (protected)
- `PUT /api/polls/:pollId` - Update poll (protected)
- `PUT /api/polls/:pollId/publish-results` - Publish results (protected)
- `PUT /api/polls/:pollId/close` - Close poll (protected)
- `DELETE /api/polls/:pollId` - Delete poll (protected)

### Responses
- `POST /api/responses/:pollId/submit` - Submit poll response (public)
- `GET /api/responses/:pollId` - Get poll responses (protected)
- `DELETE /api/responses/:responseId` - Delete response (protected)

### Analytics
- `GET /api/analytics/:pollId` - Get poll analytics (protected)
- `GET /api/analytics/public/:shareUrl` - Get published analytics (public)

## WebSocket Events

### Client to Server
- `join-poll` - Join a poll room for real-time updates
- `response-submitted` - Notify server of new response
- `leave-poll` - Leave a poll room

### Server to Client
- `analytics-update` - Real-time analytics update

## Usage Guide

### Creating a Poll
1. Register or login to your account
2. Navigate to "Create Poll"
3. Enter poll title and description
4. Add questions (at least 1)
5. Add options for each question (at least 2)
6. Set mandatory/optional for each question
7. Choose response mode (anonymous or authenticated)
8. Set expiry date and time
9. Click "Create Poll"

### Sharing a Poll
1. Go to your poll's analytics page
2. Click "Copy Link" to copy the shareable URL
3. Share the link with respondents

### Answering a Poll
1. Click the shared poll link
2. Answer all mandatory questions
3. Choose to respond anonymously (if allowed)
4. Click "Submit Response"

### Viewing Analytics
1. Go to your poll's analytics page
2. View real-time response counts
3. See question-wise breakdowns with charts
4. Track participation metrics

### Publishing Results
1. From the analytics page, click "Publish Results"
2. Share the link - anyone can now view results
3. Results update in real-time as new responses come in

## Database Schema

### User
- `username` - Unique username
- `email` - Unique email
- `password` - Hashed password
- `firstName` - First name
- `lastName` - Last name
- `avatar` - User avatar URL
- `timestamps` - Created and updated dates

### Poll
- `title` - Poll title
- `description` - Poll description
- `creator` - Reference to User
- `shareUrl` - Unique shareable URL
- `questions` - Array of questions
- `anonymous` - Allow anonymous responses
- `active` - Poll is accepting responses
- `expiryDate` - When poll expires
- `resultsPublished` - Results are public
- `totalResponses` - Response count
- `respondents` - Array of authenticated respondents
- `anonymousRespondents` - Array of anonymous response IDs

### Response
- `poll` - Reference to Poll
- `respondent` - Reference to User (if authenticated)
- `anonymous` - Is response anonymous
- `answers` - Array of selected options
- `ipAddress` - Respondent IP
- `userAgent` - Browser info

### Analytics
- `poll` - Reference to Poll
- `totalResponses` - Total responses
- `authenticatedResponses` - Count of authenticated responses
- `anonymousResponses` - Count of anonymous responses
- `questionStats` - Analytics for each question
- `participationByDate` - Participation over time

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt hashing for passwords
- **CORS** - Cross-Origin Resource Sharing configured
- **Input Validation** - Server-side and client-side validation
- **Protected Routes** - Role-based access control
- **Error Handling** - Comprehensive error messages without exposing sensitive data

## Deployment

### Deploy Backend (Heroku example)
1. Create a Heroku account
2. Install Heroku CLI
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Set environment variables: `heroku config:set KEY=VALUE`
6. Push to Heroku: `git push heroku main`

### Deploy Frontend (Vercel example)
1. Create a Vercel account
2. Connect your GitHub repository
3. Set environment variables
4. Deploy automatically on push

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Get connection string
3. Update `MONGODB_URI` in backend `.env`

## Performance Optimization

- Real-time analytics calculations with caching
- Indexed MongoDB queries
- Lazy loading in React
- Chart.js for efficient data visualization
- Socket.io for real-time updates without polling

## Future Enhancements

- Multiple question types (checkboxes, text, rating)
- Question branching/conditional logic
- Export responses as CSV/PDF
- Email notifications
- Response filtering and sorting
- Advanced analytics and reporting
- API rate limiting
- Email verification
- Two-factor authentication

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify firewall settings

### CORS Error
- Ensure `FRONTEND_URL` is correct in backend `.env`
- Check frontend API URL configuration

### Socket.io Connection Failed
- Verify `REACT_APP_SOCKET_URL` is correct
- Check backend server is running
- Ensure Socket.io is properly configured

### Port Already in Use
- Change the port in `.env`
- Or kill process using the port

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for hackathon participants
