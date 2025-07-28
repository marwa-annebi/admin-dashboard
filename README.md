# Language Learning Admin Dashboard

A beautiful, desktop-focused admin dashboard for managing a language learning mobile application. Built with React, TypeScript, and Material-UI with a custom orange theme to match your mobile app.

## 🎨 Features

### ✨ Dashboard Highlights

- **Orange Theme**: Custom theme using `RGBA(255, 152, 0, 1)` to match your mobile app
- **Desktop-Focused**: Optimized for desktop admin use, not mobile responsive
- **Modern Design**: Beautiful Material-UI components with custom styling
- **Real-time Stats**: Dashboard with key metrics and analytics
- **Hierarchical Content Management**: Languages → Domains → Lessons → Words
- **Parent Management**: Complete CRUD operations for parent accounts
- **Swagger Integration**: Auto-generate API client code from Swagger documentation

### 🔧 Technical Features

- **TypeScript**: Full type safety
- **Material-UI**: Professional component library
- **REST API Integration**: Ready to connect with Node.js backend
- **Authentication**: Secure admin login system
- **Token Management**: Access and refresh token handling
- **Error Handling**: Comprehensive error handling and retry logic
- **Content Hierarchy**: Structured content management system

## 🏗️ Content Hierarchy

The dashboard manages a hierarchical structure:

```
Languages
├── Domains (Categories within each language)
│   ├── Lessons (Learning units within each domain)
│   │   ├── Words (Vocabulary items within each lesson)
│   │   ├── Words
│   │   └── Words
│   ├── Lessons
│   └── Lessons
├── Domains
└── Domains
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies:**

```bash
cd admin-dashboard
pnpm install
```

2. **Set up environment variables:**

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your API settings
VITE_API_BASE_URL=http://localhost:3001/api
NODE_ENV=development
```

3. **Start the development server:**

```bash
pnpm dev
```

4. **Access the dashboard:**
   Open http://localhost:5173 in your browser

## 🔑 Demo Login

For testing purposes, use these credentials:

- **Email**: `admin@languageapp.com`
- **Password**: `admin123`

## 🖥️ API Integration

### Required Node.js Backend Endpoints

Your Node.js backend should implement these endpoints following the hierarchical structure:

#### Authentication

```javascript
POST / api / auth / login;
POST / api / auth / logout;
POST / api / auth / refresh;
GET / api / auth / profile;
```

#### Parents Management

```javascript
GET    /api/parents?page=1&limit=10&search=query
POST   /api/parents
GET    /api/parents/:id
PUT    /api/parents/:id
DELETE /api/parents/:id
GET    /api/parents/:id/children
GET    /api/parents/statistics
```

#### Children Management

```javascript
GET    /api/children?page=1&limit=10&search=query
POST   /api/children
GET    /api/children/:id
PUT    /api/children/:id
DELETE /api/children/:id
GET    /api/children/:id/progress
POST   /api/children/:id/enroll
```

#### Languages Management

```javascript
GET    /api/languages?page=1&limit=10&search=query
POST   /api/languages
GET    /api/languages/:id
PUT    /api/languages/:id
DELETE /api/languages/:id
GET    /api/languages/:id/domains
GET    /api/languages/:id/statistics
```

#### Domains Management

```javascript
GET    /api/domains?page=1&limit=10&search=query&languageId=:id
POST   /api/domains
GET    /api/domains/:id
PUT    /api/domains/:id
DELETE /api/domains/:id
GET    /api/domains/:id/lessons
GET    /api/languages/:languageId/domains
```

#### Lessons Management

```javascript
GET    /api/lessons?page=1&limit=10&search=query&domainId=:id
POST   /api/lessons
GET    /api/lessons/:id
PUT    /api/lessons/:id
DELETE /api/lessons/:id
GET    /api/lessons/:id/words
GET    /api/domains/:domainId/lessons
POST   /api/lessons/:id/publish
POST   /api/lessons/:id/unpublish
```

#### Words Management

```javascript
GET    /api/words?page=1&limit=10&search=query&lessonId=:id
POST   /api/words
GET    /api/words/:id
PUT    /api/words/:id
DELETE /api/words/:id
GET    /api/lessons/:lessonId/words
POST   /api/words/bulk
POST   /api/words/import
GET    /api/lessons/:lessonId/words/export
```

#### Analytics

```javascript
GET / api / analytics / dashboard;
GET / api / analytics / parents;
GET / api / analytics / children;
GET / api / analytics / languages;
GET / api / analytics / learning - progress;
GET / api / analytics / popular - words;
GET / api / analytics / user - engagement;
```

#### Swagger Documentation

```javascript
GET / swagger.json;
GET / api - docs;
```

### API Response Format

All API responses should follow this format:

```javascript
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Success message"
}

// For paginated responses:
{
  "success": true,
  "data": {
    "data": [/* array of items */],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}

// For errors:
{
  "success": false,
  "error": "Error message",
  "message": "User-friendly error message"
}
```

### Data Models

#### Language

```javascript
{
  "id": "lang_123",
  "name": "English",
  "code": "en",
  "description": "English language learning",
  "difficulty": "beginner", // "intermediate", "advanced"
  "flag": "🇺🇸",
  "totalDomains": 5,
  "totalLessons": 50,
  "totalWords": 1000,
  "enrolledUsers": 150,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Domain

```javascript
{
  "id": "domain_123",
  "name": "Animals",
  "description": "Learn about animals",
  "icon": "🐾",
  "languageId": "lang_123",
  "totalLessons": 10,
  "totalWords": 200,
  "difficulty": "beginner",
  "order": 1,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Lesson

```javascript
{
  "id": "lesson_123",
  "title": "Farm Animals",
  "description": "Learn about farm animals",
  "content": "Lesson content here",
  "domainId": "domain_123",
  "totalWords": 20,
  "difficulty": "beginner",
  "duration": 15, // minutes
  "order": 1,
  "objectives": ["Learn animal names", "Practice pronunciation"],
  "prerequisites": ["lesson_122"],
  "isPublished": true,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Word

```javascript
{
  "id": "word_123",
  "text": "cow",
  "translation": "vache",
  "pronunciation": "/kaʊ/",
  "audioUrl": "https://example.com/audio/cow.mp3",
  "imageUrl": "https://example.com/images/cow.jpg",
  "example": "The cow is in the field",
  "exampleTranslation": "La vache est dans le champ",
  "lessonId": "lesson_123",
  "partOfSpeech": "noun", // "verb", "adjective", etc.
  "difficulty": "beginner",
  "tags": ["animal", "farm"],
  "synonyms": ["cattle"],
  "antonyms": [],
  "order": 1,
  "timesLearned": 45,
  "successRate": 85.5,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Parent

```javascript
{
  "id": "parent_123",
  "email": "parent@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "avatar": "https://example.com/avatars/parent.jpg",
  "children": [/* array of child objects */],
  "subscription": {
    "plan": "premium", // "free", "family"
    "expiresAt": "2024-12-31T23:59:59.000Z",
    "isActive": true
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastLogin": "2024-01-15T10:30:00.000Z",
  "isActive": true
}
```

#### Child

```javascript
{
  "id": "child_123",
  "name": "Jane Doe",
  "age": 8,
  "avatar": "https://example.com/avatars/child.jpg",
  "parentId": "parent_123",
  "enrolledLanguages": ["lang_123", "lang_456"],
  "currentLevel": 2,
  "totalWordsLearned": 150,
  "streakDays": 7,
  "lastActivity": "2024-01-15T14:20:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "isActive": true
}
```

### Dashboard Analytics Response

`GET /api/analytics/dashboard` should return:

```javascript
{
  "success": true,
  "data": {
    "totalParents": 1234,
    "totalChildren": 856,
    "totalLanguages": 15,
    "totalDomains": 45,
    "totalLessons": 320,
    "totalWords": 12500,
    "activeUsers": 980,
    "completedLessons": 2456,
    "parentsGrowthPercentage": 12,
    "childrenGrowthPercentage": 8,
    "newLanguagesAdded": 2,
    "lessonsCompletedPercentage": 15
  }
}
```

## 🛠️ Development

### Project Structure

```
src/
├── components/           # React components
│   ├── SignIn.tsx       # Login component
│   ├── AdminDashboard.tsx # Main dashboard
│   └── management/      # Content management components
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── services/            # API services
│   ├── apiClient.ts     # HTTP client
│   ├── authService.ts   # Authentication service
│   ├── contentService.ts # Content management service
│   ├── parentService.ts # Parent/children management
│   ├── userService.ts   # Analytics service
│   └── swaggerService.ts # Swagger integration
├── types/               # TypeScript types
│   └── api.ts          # API types
├── config/              # Configuration
│   └── api.ts          # API configuration
└── App.tsx             # Main app component
```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### Environment Variables

```bash
# Required
VITE_API_BASE_URL=http://localhost:3001/api

# Optional
NODE_ENV=development
```

## 🎨 Theme Customization

The dashboard uses a custom orange theme matching your mobile app:

```javascript
primary: {
  main: 'rgba(255, 152, 0, 1)',
  light: 'rgba(255, 183, 77, 1)',
  dark: 'rgba(230, 126, 34, 1)',
}
```

## 📱 Mobile App Integration

This admin dashboard is designed to manage your language learning mobile application:

- **Parent Management**: Manage parent accounts and subscriptions
- **Children Profiles**: Track children's learning progress and enrollment
- **Content Hierarchy**: Organize languages, domains, lessons, and words
- **Analytics**: Monitor app usage and learning progress
- **Word Management**: Add vocabulary with audio, images, and translations

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Token Refresh**: Automatic token renewal
- **Session Management**: Secure session handling
- **API Error Handling**: Comprehensive error handling
- **Retry Logic**: Automatic retry for failed requests
- **Role-based Access**: Admin and super admin roles

## 📊 Swagger Integration

The dashboard includes built-in Swagger integration:

- **Auto-discovery**: Automatically detects your API endpoints
- **Client Generation**: Generate TypeScript client code from Swagger spec
- **API Validation**: Validate endpoint connectivity
- **Interactive Docs**: Direct link to Swagger UI

### Swagger Setup

1. Ensure your Node.js backend serves Swagger JSON at `/swagger.json`
2. Set up Swagger UI at `/api-docs`
3. The dashboard will automatically validate and integrate with your API

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel/Netlify

1. Connect your Git repository
2. Set environment variables in deployment settings
3. Deploy!

## 📄 API Documentation

For detailed API documentation, refer to your Node.js backend Swagger documentation at `/api-docs`. Ensure all endpoints follow the response format specified above.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support with integrating your Node.js backend or customizing the dashboard, please refer to the API integration section above.

---

**Happy Managing! 🎓📚**
