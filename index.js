const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

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
app.post('/storeOrder', (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
