# QuickNotes Architecture

## 1. Requirements

### Functional Requirements
- Users must be able to register, log in, and manage their profiles.
- Users can create, read, update, and delete their own notes.
- Users can tag notes and filter notes by tags.

### Non-Functional Requirements
- **Availability:** The system should be available 99.9% of the time.
- **Latency:** Feed loading (GET /notes) should take less than 200ms.
- **Scalability:** The system must handle traffic spikes without crashing.

## 2. Load Estimates (1 Million Users)

- **Daily Active Users (DAU):** 10% of 1,000,000 = 100,000 users/day.
- **Reads per second (Average):** Assuming each user loads their notes 10 times a day. (100,000 * 10) / 86,400 seconds ≈ **12 reads/sec**.
- **Reads per second (Peak):** 12 * 5 = **60 reads/sec**.
- **Writes per second (Average):** Assuming each user creates 2 notes a day. (100,000 * 2) / 86,400 ≈ **2 writes/sec**.
- **Storage per year:** Assuming an average note is 5 KB. (1,000,000 users * 2 notes/day * 365 days * 5 KB) ≈ **3.65 GB/year**.

## 3. Architecture Diagram

```text
[ Client (Web/Mobile App) ]
          │
          ▼
[ DNS ] ──► [ CDN ] (Caches static assets)
          │
          ▼
[ Load Balancer ]
          │
    ┌─────┴─────┐
    ▼           ▼
[ App Server 1] [ App Server 2 ]
    │           │
    ▼           ▼
[ Cache (Redis) ]
    │
    ├──► [ Primary Database ] ──► [ Read Replica ]
    │
    └──► [ Message Queue ] ──► [ Background Worker ]