# Booking API

### Bun (Node.js) Booking-backend built with TypeScript and Express.

### The application uses MongoDB and Zed for schema validation.

## Features

- User authentication with JWT
- CRUD operations for users/bookings, etc
- More...

## Setup

### Prerequisites

- Bun (latest)
- Docker (optional)
- A MongoDB instance

## Installation

1. Clone the repository:

```sh
git clone https://github.com/Remimask/Booking-website.git
cd Booking-website/Backend
```

2. Install the dependencies:

```sh
bun install
```

3. Copy the .env.example file to .env and fill in your environment variables:

```sh
cp .env.example .env
```

## Running the API

You can start the application with:

```sh
bun start
```

- This will start the server on the port specified in your .env file.

## Docker

If you prefer to use Docker, you can build and run a Docker image:

```sh
docker build -t booking-api .
docker run -p 5602:5602 booking-api
```

Using Docker Compose:

```sh
docker-compose up
```

Environment Variables

- `ADMIN_AUTH_TOKEN`: The authentication token for admin access.
- `PORT`: The port on which the server will listen.
- `MONGO_URI`: The connection string for your MongoDB instance.
- `JWT_SECRET`: The secret key used for JWT token generation.
