const { Pool } = require('pg');

    const pool = new Pool({
      user: 'your_user', // Replace with your PostgreSQL username
      host: 'localhost',
      database: 'your_database', // Replace with your database name
      password: 'your_password', // Replace with your PostgreSQL password
      port: 5432,
    });

    module.exports = {
      query: (text, params) => pool.query(text, params),
    };
