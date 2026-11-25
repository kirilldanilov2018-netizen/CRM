const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'crm-db-container',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'crm',
  user: process.env.DB_USER || 'crm_user',
  password: process.env.DB_PASSWORD || 'crm_password'
});

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

app.get('/api/contacts', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, company, created_at FROM contacts ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not load contacts' });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, email = '', company = '' } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, company)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, company, created_at`,
      [name.trim(), email.trim(), company.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create contact' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING id',
      [Number(req.params.id)]
    );
    if (!result.rowCount) return res.status(404).json({ error: 'Contact not found' });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete contact' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`CRM API listening on port ${port}`);
});
