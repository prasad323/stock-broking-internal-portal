# Stock Broking Internal Operations Portal

## Overview

This project was developed as part of the **Arham Fintech Software Engineer Technical Assessment**.

The system consists of a **Mock BSE API** and an **Internal Operations Portal** that synchronizes client, trade, employee, and mapping data. It calculates employee incentives and provides separate dashboards for Managers and Employees with real-time updates.

---

## Project Components

### 1. Mock BSE API
- Simulates BSE Exchange APIs
- Configurable response delay
- Random mid-pull failures (~20%)
- Seeded with clients, trades, employees, and mappings

### 2. Internal Portal API
- Synchronizes data from the Mock BSE API
- Stores data in MongoDB
- Provides secure REST APIs
- Calculates employee incentives
- Broadcasts live updates using Socket.IO

### 3. Internal Portal Frontend
- React (Vite) application
- Separate dashboards for Managers and Employees
- Real-time data updates
- Responsive Bootstrap UI

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- React (Vite)
- Bootstrap
- JWT Authentication
- Socket.IO
- Axios
- Node-Cron

---

## Features

### Manager

- Dashboard
- Clients
- Trades
- Employees
- Client Mappings
- Incentives (All Employees)

### Employee

- Dashboard
- My Clients
- My Incentive

---

## Synchronization

- Periodic synchronization using Cron Jobs
- Retry mechanism for temporary API failures
- Upsert operations prevent duplicate records
- Data remains available even when the Mock BSE API is unavailable
- Socket.IO automatically updates connected users when fresh data is synchronized

---

## Project Setup

### Mock BSE API

```bash
npm install
npm run seed
npm start
```

### Internal Portal API

```bash
npm install
npm start
```

### Frontend

```bash
npm install
npm run dev
```

---

## Demo Credentials

### Manager Login
Username: manager
Password:123456

### Employee Login
Username: employee1
Password: 123456

## Environment Variables

### Mock BSE API

```env
PORT=
MONGO_URI=
BSE_DELAY=
BSE_FAILURE_RATE=
```

### Internal Portal API

```env
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
MOCK_API_URL=
```

---

## Deployment

### Frontend
- Vercel :https://stock-broking-internal-portal.vercel.app/login

### Internal Portal API
- Render:https://internal-portal-api.onrender.com


### Mock BSE API
- Render: https://mock-bse-apii.onrender.com

---

## Scalability

To support **100× more clients and trades**, the application can be scaled using:

- **MongoDB Indexing** for faster searches, filtering, and aggregations.
- **Pagination** to efficiently load large datasets.
- **Background Synchronization** using scheduled Cron Jobs to avoid blocking user requests.
- **Horizontal Scaling** by deploying multiple backend instances behind a load balancer.
- **Redis Caching** to reduce database load for frequently accessed data.
- **Message Queues (RabbitMQ/Kafka)** for reliable asynchronous processing of large synchronization jobs.

---

## Architecture Highlights

- Mock BSE API simulates unreliable external APIs.
- Background synchronization fetches and stores data locally.
- MongoDB acts as the primary data store.
- JWT secures Manager and Employee access.
- Socket.IO provides real-time updates without page refresh.
- Retry logic handles temporary API failures gracefully.

---

## Future Improvements

- Redis-based distributed caching
- Docker & Kubernetes deployment
- CI/CD pipeline with GitHub Actions
- Role-based permissions with granular access control
- Monitoring using Prometheus and Grafana
