const express = require('express');
    const cors = require('cors');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const auth = require('./backend/auth');
    const menu = require('./backend/menu');
    const orders = require('./backend/orders');

    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json());

    // Middleware to verify JWT
    function authenticateToken(req, res, next) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
      });
    }

    // User Registration
    app.post('/register', async (req, res) => {
      try {
        const { username, password, email, phoneNumber } = req.body;
        const newUser = await auth.registerUser(username, password, email, phoneNumber);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
      }
    });

    // User Login
    app.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;
        const authResult = await auth.authenticateUser(username, password);

        if (!authResult) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
          message: 'Login successful',
          user: authResult.user,
          token: authResult.token,
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
      }
    });

    // Get Menu Items
    app.get('/menu', async (req, res) => {
      try {
        const menuItems = await menu.getMenuItems();
        res.json(menuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Failed to fetch menu items' });
      }
    });

    // Get Menu Item by ID
    app.get('/menu/:id', async (req, res) => {
      try {
        const menuItem = await menu.getMenuItemById(req.params.id);
        if (!menuItem) {
          return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
      } catch (error) {
        console.error('Error fetching menu item by ID:', error);
        res.status(500).json({ message: 'Failed to fetch menu item' });
      }
    });

    // Create Menu Item (Admin only)
    app.post('/menu', authenticateToken, async (req, res) => {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }
      try {
        const { name, description, imageUrl, price, category } = req.body;
        const newMenuItem = await menu.createMenuItem(name, description, imageUrl, price, category);
        res.status(201).json(newMenuItem);
      } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ message: 'Failed to create menu item' });
      }
    });

    // Update Menu Item (Admin only)
    app.put('/menu/:id', authenticateToken, async (req, res) => {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }
      try {
        const { name, description, imageUrl, price, category } = req.body;
        const updatedMenuItem = await menu.updateMenuItem(
          req.params.id,
          name,
          description,
          imageUrl,
          price,
          category
        );
        if (!updatedMenuItem) {
          return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedMenuItem);
      } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ message: 'Failed to update menu item' });
      }
    });

    // Delete Menu Item (Admin only)
    app.delete('/menu/:id', authenticateToken, async (req, res) => {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }
      try {
        const success = await menu.deleteMenuItem(req.params.id);
        if (!success) {
          return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(204).send(); // No content
      } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Failed to delete menu item' });
      }
    });

    // Create Order
    app.post('/orders', authenticateToken, async (req, res) => {
      try {
        const { totalAmount, deliveryAddress, phoneNumber, orderItems } = req.body;
        const userId = req.user.userId; // Get user ID from the authenticated user

        const orderId = await orders.createOrder(userId, totalAmount, deliveryAddress, phoneNumber, orderItems);
        res.status(201).json({ orderId });
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
      }
    });

    // Get Orders by User ID
    app.get('/orders', authenticateToken, async (req, res) => {
      try {
        const userId = req.user.userId;
        const userOrders = await orders.getOrdersByUserId(userId);
        res.json(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
      }
    });

    // Update Order Status (Admin only)
    app.put('/orders/:id/status', authenticateToken, async (req, res) => {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }
      try {
        const { status } = req.body;
        const updatedOrder = await orders.updateOrderStatus(req.params.id, status);
        if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
      } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
      }
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
