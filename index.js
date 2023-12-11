const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const orderRoutes = express.Router(); // Create a router for order-related routes

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'ecamazon' // Replace with your MySQL database name
});

// Route to handle storing orders
orderRoutes.post('/storeOrder', (req, res) => {
  const { orderId, articles, amount, clientName } = req.body;

  // Assuming your database has a table named 'orders'
  pool.query(
    `INSERT INTO orders (order_id, articles, amount, client_name) VALUES (?, ?, ?, ?)`,
    [orderId, JSON.stringify(articles), amount, clientName],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to store order' });
      } else {
        res.status(200).json({ message: 'Order stored successfully' });
      }
    }
  );
});

// Route to handle deleting an order by order_id
orderRoutes.delete('/deleteOrder/:orderId', (req, res) => {
  const orderId = req.params.orderId;

  // Assuming your database has a table named 'orders'
  pool.query(
    `DELETE FROM orders WHERE order_id = ?`,
    [orderId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete order' });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Order not found' });
        } else {
          res.status(200).json({ message: 'Order deleted successfully' });
        }
      }
    }
  );
});

// Route to fetch all orders
orderRoutes.get('/orders', (req, res) => {
  // Assuming your database has a table named 'orders'
  pool.query(
    `SELECT * FROM orders`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch orders' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// Mount the order routes at /api/orders
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
