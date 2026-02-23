# InsightLoop- Interactive Product Analytics Dashboard

A full-stack analytics dashboard built as part of the Vigility Technologies Full Stack Challenge.  
The system tracks feature interactions and provides interactive analytics with filtering capabilities.

---

## Live Demo

Frontend: [https://insightloop-interactive-analytics-dashboard.vercel.app/](https://insightloop-interactive-analytics-dashboard.vercel.app/) 

Backend API: [[https://interactive-product-analytics-dashboard.onrender.com](https://interactive-product-analytics-dashboard.onrender.com)]

Demo Credentials

Username: user1, user2, user3 and so on
Password: password
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
- bcrypt (Password hashing)

---

## Features

- JWT-based authentication
- Feature interaction tracking
- Bar chart (Feature usage count)
- Line chart (Daily trend analysis)
- Filters:
  - Age Group (<18, 18–40, >40)
  - Gender (Male, Female, Other)
  - Date Range
- Persistent filters using cookies
- Fully responsive dashboard
- Light and dark theme
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

All age groups (<18, 18–40, >40)

All genders (Male, Female, Other)

At least 10 interactions per category per month

12 months of historical data

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

Username: user1, user2, user3 and so on

Password: password (Any seeded user follows same password: dummy)

---

## Architectural Overview

## Backend Architecture

### The backend follows a simple layered structure:

Authentication Layer

JWT-based stateless authentication

Password hashing with bcrypt

Tracking System

Every interaction stored in featureClick table

Linked via foreign key to user

Analytics Endpoint

Applies filters dynamically:

Age

Gender

Date range

Aggregates:

Feature count (Bar Chart)

Daily trend (Line Chart)

Database Design

User

FeatureClick

Indexed timestamp for efficient filtering

## Frontend Architecture

### Fully client-side dashboard using Next.js App Router

Axios for API communication

Recharts for visualizations

Filters stored in cookies for session persistence

Responsive design using Tailwind CSS

Loading states and empty states handled explicitly

## Seed Strategy

### The seed script ensures:

All age categories exist

All gender categories exist

Every month (past 12 months) has data

Minimum 10 entries per category per month

This guarantees that analytics filters always produce meaningful output.

## Assumptions Made

This dashboard is intended for analytics demonstration purposes.

Authentication is minimal and does not include role-based access.

Analytics are computed on read instead of pre-aggregated.

Dataset size is moderate for demo environment.

### Deliverables

Source Code Repository

Live Demo URL

Structured README

Seed Instructions

Architectural Explanation

Scaling Essay included below

