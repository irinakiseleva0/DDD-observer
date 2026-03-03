# Domain: Order Management

## Overview
This system manages orders created from raw user input. The domain is responsible for validating the data and ensuring all business rules are respected.

## Business Rules
- OrderId cannot be empty
- Order name cannot be empty
- Price must be >= 0 and finite
- Quantity must be an integer and >= 1
- Total is calculated as Price * Quantity
- Invalid data must be rejected

## Domain Logic
The domain uses smart constructors to validate input and create safe objects.

If invalid data is provided:
- an error is thrown
- the system catches it (no crash)

## Domain Events
The domain emits events when something important happens:
- OrderCreated -> when an order is successfully created
- OrderRejected -> when input is invalid

## Observer Pattern
Observers listen to domain events and react:

- Logger -> logs events (mock)
- Notifier -> simulates sending an email
- ETA -> simulates ETA calculation

## Design Goal
Keep the domain pure (no side effects) and handle all external actions through observers.