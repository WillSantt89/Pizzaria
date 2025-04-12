const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const db = require('./db');

    const saltRounds = 10;
    const secretKey = 'your-secret-key'; // Replace with a strong, random secret key

    async function hashPassword(password) {
      return bcrypt.hash(password, saltRounds);
    }

    async function comparePasswords(password, hashedPassword) {
      return bcrypt.compare(password, hashedPassword);
    }

    async function generateToken(user) {
      const payload = {
        userId: user.id,
        username: user.username,
        isAdmin: user.is_admin,
      };
      return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    }

    async function registerUser(username, password, email, phoneNumber) {
      try {
        const hashedPassword = await hashPassword(password);
        const result = await db.query(
          'INSERT INTO users (username, password, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING id, username, email, phone_number',
          [username, hashedPassword, email, phoneNumber]
        );
        return result.rows[0];
      } catch (error) {
        console.error('Registration error:', error);
        throw error; // Re-throw the error to be handled by the route
      }
    }

    async function authenticateUser(username, password) {
      try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
          return null; // User not found
        }

        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
          return null; // Password does not match
        }

        const token = await generateToken(user);
        return { user, token };
      } catch (error) {
        console.error('Authentication error:', error);
        throw error; // Re-throw the error to be handled by the route
      }
    }

    module.exports = {
      registerUser,
      authenticateUser,
    };
