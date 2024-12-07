const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(cors({ origin: 'http://127.0.0.1:5500', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(bodyParser.json());

// Fetch reading list
app.get('/reading-list', async (req, res) => {
  const { data, error } = await supabase.from('reading_list').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add book to reading list
app.post('/reading-list', async (req, res) => {
  const { title, author } = req.body;
  const { error } = await supabase.from('reading_list').insert([{ title, author }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).send('Book added to reading list!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://377-final-project-one.vercel.app/'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));




