# QuickNotes API Design Document

## REST Endpoints

### 1. List All Notes
- **Method:** `GET`
- **Path:** `/notes`
- **Description:** Retrieves a paginated list of notes for the authenticated user.
- **Success Status Code:** `200 OK`

### 2. Get a Single Note
- **Method:** `GET`
- **Path:** `/notes/{id}`
- **Description:** Retrieves the details of a specific note by its ID.
- **Success Status Code:** `200 OK`

### 3. Create a Note
- **Method:** `POST`
- **Path:** `/notes`
- **Description:** Creates a new note for the authenticated user.
- **Success Status Code:** `201 Created`
- **Request Body Example:**
  ```json
  {
    "title": "Meeting Notes",
    "body": "Discussed project timeline and milestones...",
    "tags": ["work", "meeting"]
  }