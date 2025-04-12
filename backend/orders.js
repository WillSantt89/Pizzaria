const db = require('./db');

    async function createOrder(userId, totalAmount, deliveryAddress, phoneNumber, orderItems) {
      const client = await db.pool.connect();
      try {
        await client.query('BEGIN');

        const orderResult = await client.query(
          'INSERT INTO orders (user_id, total_amount, delivery_address, phone_number) VALUES ($1, $2, $3, $4) RETURNING id',
          [userId, totalAmount, deliveryAddress, phoneNumber]
        );
        const orderId = orderResult.rows[0].id;

        for (const item of orderItems) {
          await client.query(
            'INSERT INTO order_items (order_id, menu_item_id, quantity, item_price) VALUES ($1, $2, $3, $4)',
            [orderId, item.menuItemId, item.quantity, item.itemPrice]
          );
        }

        await client.query('COMMIT');
        return orderId;
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating order:', error);
        throw error;
      } finally {
        client.release();
      }
    }

    async function getOrdersByUserId(userId) {
      try {
        const result = await db.query(
          'SELECT o.*, oi.quantity, oi.item_price, mi.name AS item_name FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE o.user_id = $1',
          [userId]
        );
        return result.rows;
      } catch (error) {
        console.error('Error fetching orders by user ID:', error);
        throw error;
      }
    }

    async function updateOrderStatus(orderId, status) {
      try {
        const result = await db.query('UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [
          status,
          orderId,
        ]);
        return result.rows[0];
      } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
      }
    }

    module.exports = {
      createOrder,
      getOrdersByUserId,
      updateOrderStatus,
    };
