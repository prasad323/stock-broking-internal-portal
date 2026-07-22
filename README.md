# Stock Broking Internal Operations Portal

## Overview
This project was developed for the Arham Fintech Software Engineer Technical Assessment.

### Components
- **mock-bse-api** – Simulates BSE APIs with configurable delay and random failures.
- **internal-portal-api** – Synchronizes data, stores it in MongoDB, exposes secure APIs, calculates incentives, and broadcasts updates using Socket.IO.
- **internal-portal-frontend** – React dashboard for Managers and Employees.

## Tech Stack
- Node.js, Express.js
- MongoDB + Mongoose
- React (Vite)
- Bootstrap
- JWT Authentication
- Socket.IO
- Axios
- node-cron

## Features
### Manager
- Dashboard
- Clients
- Trades
- Employees
- Client Mappings
- Incentives

### Employee
- Dashboard
- My Clients
- My Incentive

## Synchronization
- Cron job periodically syncs data from Mock BSE API.
- Retry mechanism handles temporary failures.
- Upsert prevents duplicate records.
- Socket.IO pushes live updates to connected users.

## Running

### Mock API
```
npm install
npm run seed
npm start
```

### Internal API
```
npm install
npm start
```

### Frontend
```
npm install
npm run dev
```

## Environment Variables

Mock API
- PORT
- MONGO_URI
- BSE_DELAY
- BSE_FAILURE_RATE

Internal API
- PORT
- MONGO_URI
- JWT_SECRET
- MOCK_API_URL

## Scalability
- MongoDB indexing
- Pagination
- Background synchronization
- Horizontal scaling
- Redis cache
- Message queues (RabbitMQ/Kafka)
