# The Coin Shack API Documentation

Complete API reference for The Coin Shack platform.

## Base URL

**Production:** `https://your-domain.netlify.app/api`
**Local:** `http://localhost:3000/api`

## Authentication

Most endpoints are public, but some require authentication via NextAuth.js.

### Headers

```
Content-Type: application/json
Authorization: Bearer <token> (for authenticated endpoints)
```

## Endpoints

### Authentication

#### `POST /api/auth/signin`
Login with credentials.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": "jwt-token"
}
```

### Hosts

#### `GET /api/hosts`
Get all hosts.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Rari",
    "avatar": "https://...",
    "bio": "Professional coin dealer...",
    "isLive": true,
    "followers": 12847
  }
]
```

**Query Parameters:**
- `live` (boolean) - Filter by live status

### Streams

#### `GET /api/streams`
Get all streams.

**Response:**
```json
[
  {
    "id": "1",
    "hostId": "1",
    "hostName": "Rari",
    "hostAvatar": "https://...",
    "title": "Rare Morgan Dollars Live Auction",
    "isLive": true,
    "viewers": 342,
    "startsAt": "2024-01-15T10:00:00Z"
  }
]
```

**Query Parameters:**
- `live` (boolean) - Filter by live status
- `hostId` (string) - Filter by host ID

#### `POST /api/streams` (Admin)
Create a new stream.

**Request:**
```json
{
  "hostId": "1",
  "title": "New Stream",
  "isLive": false,
  "startsAt": "2024-01-20T14:00:00Z"
}
```

### Games

#### `GET /api/games`
Get all games.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Morgan Dollar Auction",
    "type": "Auction",
    "hostId": "1",
    "hostName": "Rari",
    "participants": 45,
    "prizePool": 2500
  }
]
```

**Query Parameters:**
- `type` (string) - Filter by game type
- `hostId` (string) - Filter by host ID

### Products

#### `GET /api/products`
Get all products.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Premium Mystery Coin Box",
    "description": "Curated selection...",
    "price": 299.99,
    "image": "https://...",
    "isFeatured": true,
    "stock": 12
  }
]
```

**Query Parameters:**
- `featured` (boolean) - Filter featured products
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price

### Posts

#### `GET /api/posts`
Get community posts.

**Response:**
```json
[
  {
    "id": "1",
    "authorId": "1",
    "authorName": "Rari",
    "authorAvatar": "https://...",
    "content": "Just got in an amazing...",
    "image": "https://...",
    "timestamp": "2024-01-15T12:00:00Z",
    "likes": 48,
    "comments": 12
  }
]
```

**Query Parameters:**
- `limit` (number) - Limit results
- `authorId` (string) - Filter by author

#### `POST /api/posts` (Authenticated)
Create a new post.

**Request:**
```json
{
  "content": "My new post content",
  "image": "https://..." // optional
}
```

#### `PUT /api/posts/:id/like` (Authenticated)
Like/unlike a post.

**Response:**
```json
{
  "likes": 49,
  "isLiked": true
}
```

### Pricing

#### `GET /api/pricing`
Get metal spot prices.

**Response:**
```json
[
  {
    "metal": "Gold",
    "price": "$2,356",
    "trend": "up"
  },
  {
    "metal": "Silver",
    "price": "$27.33",
    "trend": "down"
  }
]
```

**Query Parameters:**
- `metal` (string) - Filter by metal type

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "message": "Missing required field: email"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

- **Public endpoints**: 100 requests/minute per IP
- **Authenticated endpoints**: 1000 requests/minute per user
- **Admin endpoints**: 5000 requests/minute per admin

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

## Webhooks

### Stream Started
```json
{
  "event": "stream.started",
  "data": {
    "streamId": "1",
    "hostId": "1",
    "startedAt": "2024-01-15T10:00:00Z"
  }
}
```

### Game Completed
```json
{
  "event": "game.completed",
  "data": {
    "gameId": "1",
    "winnerId": "user123",
    "prize": 2500
  }
}
```

## SDK Examples

### JavaScript/TypeScript
```typescript
const API_URL = 'https://your-domain.netlify.app/api';

async function getHosts() {
  const response = await fetch(`${API_URL}/hosts`);
  return response.json();
}
```

### React Native
```typescript
import { api } from './services/api';

const hosts = await api.get('/hosts');
```

## Support

For API support:
- Email: api@coinshack.com
- Documentation: https://docs.coinshack.com/api

