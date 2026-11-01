# QuickNotes System Design

## Description
QuickNotes is a scalable note-taking application designed to handle 1 million users. This repository contains the frontend API client and the comprehensive system design documents required to build the backend infrastructure.

## How to Run the API Client
1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser (or use VS Code Live Server).
3. Use the "Load Notes" button to fetch sample data, and the form to create new notes.

## Documentation
- [API Design Document](docs/api-design.md)
- [Data Model Document](docs/data-model.md)
- [Architecture Document](docs/architecture.md)

## What I Learned
1. **API Integration:** How to properly use `fetch` with `async/await` to handle GET, POST, and DELETE requests, including robust error handling and loading states.
2. **System Scaling:** How to calculate load estimates (reads/writes per second) and design an architecture using load balancers, caching, and read replicas to handle high traffic.
3. **Database Modeling:** The importance of using join tables for many-to-many relationships (like notes and tags) and how to optimize queries using indexes.