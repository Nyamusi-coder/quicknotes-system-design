const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const loadBtn = document.getElementById('load-btn');
const statusEl = document.getElementById('status');
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const submitBtn = document.getElementById('submit-btn');
const notesList = document.getElementById('notes-list');

// Reusable request function
async function request(method, url, body = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
}

// Helper to set status message and style
function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = ''; // Clear previous classes
    if (type === 'loading') statusEl.classList.add('status-loading');
    if (type === 'success') statusEl.classList.add('status-success');
    if (type === 'error') statusEl.classList.add('status-error');
}

// GET: Load 10 notes
async function loadNotes() {
    loadBtn.disabled = true;
    setStatus('Loading notes...', 'loading');
    notesList.innerHTML = '';

    try {
        const response = await request('GET', `${API_URL}?_limit=10`);
        const notes = await response.json();
        
        if (notes.length === 0) {
            setStatus('No notes found.', 'success');
            notesList.innerHTML = '<li>No notes available.</li>';
        } else {
            setStatus(`Loaded ${notes.length} notes from the server.`, 'success');
            notes.forEach(note => renderNote(note));
        }
    } catch (error) {
        setStatus(`Error loading notes: ${error.message}`, 'error');
    } finally {
        loadBtn.disabled = false;
    }
}

// Render a single note to the DOM
function renderNote(note) {
    const li = document.createElement('li');
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'note-content';
    
    const titleEl = document.createElement('div');
    titleEl.className = 'note-title';
    titleEl.textContent = note.title; // textContent only for security
    
    const bodyEl = document.createElement('div');
    bodyEl.className = 'note-body';
    bodyEl.textContent = note.body; // textContent only for security
    
    contentDiv.appendChild(titleEl);
    contentDiv.appendChild(bodyEl);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id, li));
    
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    
    // Add new notes to the top, older to the bottom
    notesList.prepend(li);
}

// POST: Create a note
async function createNote(event) {
    event.preventDefault();
    
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    // Validation: Title is required and max 100 characters
    if (!title) {
        setStatus('Error: Title is required.', 'error');
        return;
    }
    if (title.length > 100) {
        setStatus('Error: Title must be 100 characters or less.', 'error');
        return;
    }

    submitBtn.disabled = true;
    setStatus('Creating note...', 'loading');

    try {
        const newNoteData = { title, body, userId: 1 };
        const response = await request('POST', API_URL, newNoteData);
        const createdNote = await response.json();
        
        // JSONPlaceholder returns a fake ID (e.g., 101) and status 201.
        // We optimistically add it to the UI.
        renderNote(createdNote);
        setStatus(`Note created (status ${response.status}, id ${createdNote.id}).`, 'success');
        
        // Clear form
        titleInput.value = '';
        bodyInput.value = '';
    } catch (error) {
        setStatus(`Error creating note: ${error.message}`, 'error');
    } finally {
        submitBtn.disabled = false;
    }
}

// DELETE: Remove a note
async function deleteNote(id, listItemElement) {
    // Disable the specific delete button to prevent double clicks
    const deleteBtn = listItemElement.querySelector('.delete-btn');
    deleteBtn.disabled = true;
    deleteBtn.textContent = 'Deleting...';

    try {
        await request('DELETE', `${API_URL}/${id}`);
        
        /* 
         * NOTE ON JSONPLACEHOLDER LIMITATION:
         * JSONPlaceholder is a mock API. It accepts POST requests and returns 
         * a fake ID (like 101), but it DOES NOT actually save the data. 
         * Therefore, if we try to DELETE a note we just created, the API 
         * might return a 404 Not Found. 
         * 
         * Our approach: We handle the request. If it succeeds (or even if it 
         * fails due to the mock nature of the API for newly created items), 
         * we remove the note from the UI to provide a smooth user experience, 
         * as the mock server cannot persist it anyway.
         */
        
        listItemElement.remove();
        setStatus(`Note ${id} deleted successfully.`, 'success');
    } catch (error) {
        // Even if the mock API throws a 404 for a fake ID, we remove it from UI
        listItemElement.remove();
        setStatus(`Note removed from UI (Mock API note: ${error.message})`, 'success');
    } finally {
        deleteBtn.disabled = false;
        deleteBtn.textContent = 'Delete';
    }
}

// Event Listeners
loadBtn.addEventListener('click', loadNotes);
noteForm.addEventListener('submit', createNote);