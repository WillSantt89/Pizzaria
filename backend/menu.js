const db = require('./db');

    async function getMenuItems() {
      try {
        const result = await db.query('SELECT * FROM menu_items');
        return result.rows;
      } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
      }
    }

    async function getMenuItemById(id) {
      try {
        const result = await db.query('SELECT * FROM menu_items WHERE id = $1', [id]);
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching menu item by ID:', error);
        throw error;
      }
    }

    async function createMenuItem(name, description, imageUrl, price, category) {
      try {
        const result = await db.query(
          'INSERT INTO menu_items (name, description, image_url, price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [name, description, imageUrl, price, category]
        );
        return result.rows[0];
      } catch (error) {
        console.error('Error creating menu item:', error);
        throw error;
      }
    }

    async function updateMenuItem(id, name, description, imageUrl, price, category) {
      try {
        const result = await db.query(
          'UPDATE menu_items SET name = $1, description = $2, image_url = $3, price = $4, category = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
          [name, description, imageUrl, price, category, id]
        );
        return result.rows[0];
      } catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
      }
    }

    async function deleteMenuItem(id) {
      try {
        const result = await db.query('DELETE FROM menu_items WHERE id = $1', [id]);
        return result.rowCount > 0; // Returns true if a row was deleted
      } catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
      }
    }

    module.exports = {
      getMenuItems,
      getMenuItemById,
      createMenuItem,
      updateMenuItem,
      deleteMenuItem,
    };
