const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'new_password', // Replace with your MySQL password
  database: 'swen_db',
});

// Establish MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Configure session middleware
const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'swen_db',
});

app.use(
  session({
    key: 'user_session',
    secret: 'supersecretkey', // Replace with a strong secret key
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // Use true if using HTTPS
    },
  })
);

// Sign-up API route
app.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email is already registered' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Error processing the request' });
  }
});

// Login API route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      req.session.user = { email: user.email }; // Save user email in session
      return res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// Logout API route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.clearCookie('user_session');
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
};

// Fetch events API route
app.get('/api/events', (req, res) => {
  const query = 'SELECT id, name, description, date, time, location FROM events';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ events: results });
  });
});

// Fetch all bookings
app.get('/api/bookings', isAuthenticated, (req, res) => {
  const query = 'SELECT * FROM bookings WHERE booker_email = ?';
  db.query(query, [req.session.user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ bookings: results });
  });
});

// Add a new booking
app.post('/api/bookings', (req, res) => {
  const { first_name, last_name, location, date, time } = req.body;
  const booker_email = req.session?.user?.email; // Get email from session

  if (!booker_email || !first_name || !last_name || !location || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const insertBookingQuery = `
    INSERT INTO bookings (booker_email, first_name, last_name, location, date, time)
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    insertBookingQuery,
    [booker_email, first_name, last_name, location, date, time],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'Booking added successfully', bookingId: result.insertId });
    }
  );
});

// Fetch all appointments
app.get('/api/appointments', isAuthenticated, (req, res) => {
  const query = 'SELECT * FROM appointments WHERE booker_email = ?';
  db.query(query, [req.session.user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ appointments: results });
  });
});

// Add a new appointment
app.post('/api/appointments', (req, res) => {
  const { bookee_name, location, date, time } = req.body;
  const booker_email = req.session?.user?.email; // Get email from session

  if (!booker_email || !bookee_name || !location || !date || !time) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const insertQuery = `
    INSERT INTO appointments (booker_email, bookee_name, location, date, time)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(insertQuery, [booker_email, bookee_name, location, date, time], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Failed to create appointment.' });
    }
    res.status(201).json({ message: 'Appointment created successfully.', appointmentId: results.insertId });
  });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
