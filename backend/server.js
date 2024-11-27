const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');  // Import CORS

const app = express();
app.use(express.json()); // Middleware to parse JSON data
app.use(bodyParser.json());

app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Hmed2004',
    database: 'swen_mysql',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT id, first_name, email FROM user_info';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users.');
    } else {
      res.json(results);
    }
  });
});

app.get('/user_info', (req, res) => {
  const query = 'SELECT * FROM user_info'; // Get all users from the user_info table
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error retrieving user data.' });
    }
    res.status(200).json(result); // Send the result of the query as a response
  });
});

app.get('/events', (req, res) => {
  const query = 'SELECT * FROM events'; // Get all users from the user_info table
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error retrieving user data.' });
    }
    res.status(200).json(result); // Send the result of the query as a response
  });
});

app.get('/appointments', (req, res) => {
  const query = 'SELECT * FROM appointments'; // Get all users from the user_info table
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error retrieving user data.' });
    }
    res.status(200).json(result); // Send the result of the query as a response
  });
});

app.get('/room_bookings', (req, res) => {
  const query = 'SELECT * FROM room_bookings'; // Get all users from the user_info table
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error retrieving user data.' });
    }
    res.status(200).json(result); // Send the result of the query as a response
  });
});

app.post('/signup', (req, res) => {
  const { id, first_name, last_name, email, password } = req.body;

  // SQL query to insert data into the 'user_info' table
  const query = `
    INSERT INTO user_info (id, first_name, last_name, email, password)
    VALUES (?, ?, ?, ?, ?);
  `;

  // Execute the query
  connection.query(query, [id, first_name, last_name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting user data into database.' });
    }

    res.status(201).json({ message: 'User created successfully.' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user_info WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ message: 'Error logging in.' });
    }

    if (result.length > 0) {
      // User found, successful login
      return res.status(200).json({ message: 'Login successful', user: result[0] });
    } else {
      // User not found or incorrect password
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.get('/', (req, res) => {
    res.send('Hello, World! Server is up and running.');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
