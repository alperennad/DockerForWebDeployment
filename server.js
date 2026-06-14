const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
    })
  : null;

app.use(express.static(__dirname));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'docker-web-backend',
    databaseConfigured: Boolean(pool),
  });
});

app.get('/api/db', async (req, res) => {
  if (!pool) {
    res.status(500).json({
      ok: false,
      message: 'DATABASE_URL tanimli degil',
    });
    return;
  }

  try {
    const result = await pool.query('select now() as time, current_database() as database');

    res.json({
      ok: true,
      database: result.rows[0].database,
      time: result.rows[0].time,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Veritabanina baglanilamadi',
      error: error.message,
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port} adresinde calisiyor`);
});
