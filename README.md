# InsightLoop — Interactive Product Analytics Dashboard

A full-stack analytics dashboard built as part of the **Vigility Technologies Full Stack Challenge**.  
The system tracks user feature interactions and provides interactive analytics with dynamic filtering.

---

## Live Demo

**Frontend**  
https://insightloop-interactive-analytics-dashboard.vercel.app/

**Backend API**  
https://interactive-product-analytics-dashboard.onrender.com

---

## Demo Credentials

- Username: `user1`, `user2`, `user3`, ...
- Password: `password`
- (Any seeded user follows same password: password)
---

## Design Philosophy

The goal of this project was not only to build a working dashboard, but to design it in a way that ensures structured data generation, consistent analytics output, and a clean user experience even under different filter combinations.

---

## Tech Stack

### Frontend
- Next.js  
- TypeScript  
- Tailwind CSS  
- Recharts (Data Visualization)  
- Axios  
- js-cookie  

### Backend
- Node.js  
- Express.js  
- Prisma ORM  
- PostgreSQL  
- JWT Authentication  
- bcrypt (Password Hashing)  

## Production Deployment

- Backend deployed on Render
- Frontend deployed on Vercel
- PostgreSQL hosted externally

---

## Features

- JWT-based authentication  
- Feature interaction tracking  
- Bar Chart — Feature usage count  
- Line Chart — Daily trend analysis  
- Dynamic Filters:
  - Age Group (<18, 18–40, >40)
  - Gender (Male, Female, Other)
  - Date Range  
- Persistent filters using cookies  
- Fully responsive dashboard  
- Light & Dark theme  
- Structured seeded dataset across:
  - All age groups  
  - All genders  
  - 12 months of historical data  

---

# Running Locally

## Clone Repository

git clone [https://github.com/shashankmishra21/Interactive-Product-Analytics-Dashboard.git](https://github.com/shashankmishra21/Interactive-Product-Analytics-Dashboard.git)

cd backend

Install dependencies

npm install

## Configure Environment Variables

Create a .env file inside the backend folder:

DATABASE_URL="your_postgres_connection_string"

JWT_SECRET="your_secret_key"

PORT=5000

### Run Prisma Migrations

npx prisma migrate dev

Seed Database

node seed.js

This generates:
- All age groups (<18, 18–40, >40)
- All genders (Male, Female, Other)
- bAt least 10 interactions per category per month
- 12 months of historical data

### Start Backend
node server.js

Backend runs at: http://localhost:5000

### Frontend Setup

Navigate to frontend directory:

cd ../frontend

npm install

npm run dev

Frontend runs at: http://localhost:3000

### Demo Credentials

- Username: user1, user2, user3 and so on
- Password: password (Any seeded user follows same password: password)

---

## Architectural Overview

## Backend Architecture

### The backend follows a simple layered structure:

**Authentication Layer**
- JWT-based stateless authentication
- Password hashing with bcrypt

**Tracking System**
- Every interaction stored in `featureClick` table
- Linked via foreign key to `User`

**Analytics Endpoint**
- Applies filters dynamically:
  - Age
  - Gender
  - Date range
- Aggregates:
  - Feature count (Bar Chart)
  - Daily trend (Line Chart)

**Database Design**
- `User`
- `FeatureClick`
- Indexed timestamp for efficient filtering

## Frontend Architecture

### Fully client-side dashboard using Next.js App Router
- Axios for API communication
- Recharts for visualizations
- Filters stored in cookies for session persistence
- Responsive design using Tailwind CSS
- Loading states and empty states handled explicitly

## Seed Strategy

### The seed script ensures:
- All age categories exist
- All gender categories exist
- Every month (past 12 months) has data
- Minimum 10 entries per category per month
- This guarantees that analytics filters always produce meaningful output.

## Assumptions Made
- This dashboard is intended for analytics demonstration purposes.
- Authentication is minimal and does not include role-based access.
- Analytics are computed on read instead of pre-aggregated.
- Dataset size is moderate for demo environment.

## Short Essay — Scaling to 1 Million Write Events per Minute

If this system had to process approximately 1 million write events per minute, the backend would have to evolve from a simple single-server architecture to a more distributed architecture. Instead of directly writing each tracking event into the database, these events would be published to a message queue like Kafka or RabbitMQ. This would allow the system to handle sudden traffic spikes and prevent the database from getting flooded. Background worker processes could then handle these events asynchronously and write them to the database in batches, making it more efficient and stable.

For storage, the database could be made more scalable by using techniques like partitioning and read replicas to distribute the load. Frequently accessed data could also be cached using Redis to avoid repeated database queries. A load balancer would then be used to distribute incoming traffic across multiple stateless backend instances so that the system could scale horizontally with increasing traffic. Additionally, monitoring, logging, and simple rate limiting would be implemented to ensure that the system stays healthy and doesn’t get overloaded.

This architecture would allow the system to scale horizontally, handle traffic spikes gracefully, and maintain reliability even under extremely high event volumes.

### Deliverables

- Source Code Repository
- Live Demo URL
- Structured README
- Seed Instructions
- Architectural Explanation
- Scaling Essay included 