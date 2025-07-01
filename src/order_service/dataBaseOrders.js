const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '5409',
  database: process.env.DB_NAME || 'orders',
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the PostgreSQL database');
    initializeDatabase(); 
  }
});

const initializeDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      products JSONB,
      total_price DECIMAL(10, 2),
      status VARCHAR(50) DEFAULT 'Pending'
    );
  `;

  const insertDataQuery = `
    INSERT INTO orders (products, total_price, status)
    VALUES 
      (
        '[{"product_id": 1, "title": "keyboard", "amount": 2, "price": 23}, {"product_id": 3, "title": "gamepad", "amount": 1, "price": 45}]'::jsonb,
        91,
        'Pending'
      )
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Orders table created or already exists.');

    const { rowCount } = await pool.query('SELECT 1 FROM orders LIMIT 1');
    
    if (rowCount === 0) {

      await pool.query(insertDataQuery);
      console.log('Initial data inserted into orders table.');
    } else {
      console.log('Orders table already contains data; no initial data inserted.');
    }

  } catch (error) {
    console.error('Error during database initialization', error);
  }
};

module.exports = pool;


//=================================================================================================================
//=================================================================================================================


// const { Pool } = require('pg');

// const pool = new Pool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || '5409',
//   database: process.env.DB_NAME || 'orders',
//   port: process.env.DB_PORT || 5432,
// });

  

// pool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database', err);
//   } else {
//     console.log('Connected to the PostgreSQL database');
//   }
// });

// module.exports = pool