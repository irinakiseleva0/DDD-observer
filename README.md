# 🚀 DDD + Observer Pattern in TypeScript

## 📌 Overview

This project demonstrates Domain-Driven Design (DDD) and the Observer Pattern using TypeScript.

The system models an Order Management domain, where business rules are strictly enforced, and side effects are handled through observers.

---

## 🧠 Domain: Order Management

The domain is responsible for validating and creating Orders from raw user input.

### ✅ Business Rules

- OrderId cannot be empty  
- Order name cannot be empty  
- Price must be a finite number ≥ 0  
- Quantity must be an integer ≥ 1  
- Total is calculated as: Price × Quantity  
- Invalid data is rejected (throws error)  

---

## Key Concepts

Branded Types  
Smart Constructors  
Entities  
Domain Events  
Observer Pattern  

---

## 🏗️ Architecture

domain/
  events.ts
  order.ts

observers/
  logger.ts
  notifier.ts
  eta.ts

services/
  mockAudit.ts
  mockEmail.ts
  mockEta.ts

docs/
  domain.md

index.ts

---
## 🔔 Domain Events

- OrderCreated → successful order creation  
- OrderRejected → invalid input  

---

## 👀 Observer Pattern

Observers react to domain events:

- Logger → logs events (mock audit system)
- Notifier → sends email (mock)
- ETA → calculates estimated delivery time (mock)

--- 

## ▶️ Running the Project

npm install  
npm run dev

git checkout feat/order-domain