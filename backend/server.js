import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database configuration with connection timeout
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionTimeoutMillis: 5000, // 5 seconds timeout
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API Endpoint untuk mendapatkan users dengan error handling lebih baik
app.get('/api/users', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { rows } = await client.query(`
      SELECT 
        user_id, 
        username, 
        email, 
        is_active, 
        created_at, 
        updated_at 
      FROM users
    `);
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  } finally {
    if (client) client.release();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database host: ${process.env.DB_HOST}`);
});
