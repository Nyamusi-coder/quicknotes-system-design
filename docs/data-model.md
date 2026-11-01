# QuickNotes Data Model

## Entities and Relationships

### Entities
1. **Users:** Represents the people using the app.
2. **Notes:** Represents the actual notes created by users.
3. **Tags:** Represents categories or labels used to organize notes (e.g., "Work", "Personal").
4. **Note_Tags:** A join table that links notes to tags.

### Relationships
- **One-to-Many (Users to Notes):** One user can create many notes, but each note belongs to only one user.
- **Many-to-Many (Notes to Tags):** A note can have many tags, and a tag can be applied to many notes. Because relational databases cannot handle many-to-many relationships directly, we use the `note_tags` join table to link them together.

---

## Database Schema (CREATE TABLE Statements)

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);