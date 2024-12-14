const SUPABASE_URL = 'https://iycbbgybrnnxegoirtcp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Y2JiZ3licm5ueGVnb2lydGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTY1NDQsImV4cCI6MjA0ODkzMjU0NH0.kJdjbG8wFyqm9tLui7c30pO672bCpAF6hOZqEb_bxks';

const API_BASE_URL = '377-final-project-l0s3jm1r5-yamashahnawaz4s-projects.vercel.app'; // Replace with your actual deployed backend URL

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route serves the main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes for the reading list
const readingList = [];

// Get all books in the reading list
app.get('/reading-list', (req, res) => {
    res.json(readingList);
});

// Add a new book to the reading list
app.post('/reading-list', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    readingList.push({ title, author });
    res.status(201).json({ message: 'Book added to the reading list' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`BookExplorer is running at 377-final-project-l0s3jm1r5-yamashahnawaz4s-projects.vercel.app`);
});









