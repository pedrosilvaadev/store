# Store

This project is split into two applications:

- `store-admin`: a Next.js admin panel for listing products, filtering categories, and creating orders.
- `store-api`: an Express API with PostgreSQL and Redis for products and orders.

## Structure

```text
store/
  store-admin/
  store-api/
```

## Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL
- Cache and support services: Redis
- Local infrastructure: Docker Compose

## Prerequisites

- Node.js 20+
- npm
- Docker and Docker Compose

## Environment Variables

### store-api

Create a `.env` file inside `store-api` with the following content:

```env
PORT=4000
DATABASE_URL=postgresql://postgres:password@localhost:5434/store_db
REDIS_URL=redis://localhost:6379
```

### store-admin

Create a `.env.local` file inside `store-admin` with the following content:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:4000
```

## Running the Project

### 1. Start the infrastructure

Inside `store-api`:

```bash
docker-compose up -d
```

This starts:

- PostgreSQL on port `5434`
- Redis on port `6379`

### 2. Install dependencies

Inside `store-api`:

```bash
npm install
```

Inside `store-admin`:

```bash
npm install
```

### 3. Seed the database

Inside `store-api`:

```bash
npm run seed
```

The seed script creates the `products` and `orders` tables and inserts sample products.

### 4. Run the API

Inside `store-api`:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`.

### 5. Run the admin panel

Inside `store-admin`:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Scripts

### store-admin

- `npm run dev`: starts the frontend in development mode
- `npm run build`: creates the production build
- `npm run start`: runs the production build
- `npm run lint`: runs the linter

### store-api

- `npm run dev`: starts the API with auto-reload
- `npm run seed`: creates and populates the database

## Main Endpoints

### Products

- `GET /api/products`: returns the product list

### Orders

- `GET /api/orders`: returns the order list
- `POST /api/orders`: creates a new order

## System Flow

1. `store-admin` fetches products from the API.
2. The user navigates between the products and orders tabs.
3. When an order is created, the frontend sends a request to `store-api`.
4. The API persists the data in PostgreSQL and uses Redis as a supporting service for performance-related needs.

## Notes

- The frontend depends on `NEXT_PUBLIC_BASE_URL` to communicate with the API.
- The backend uses `DATABASE_URL` to connect to PostgreSQL.
- The project does not currently include an automated test suite.
