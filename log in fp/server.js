const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

// Database connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '771270sw',
  database: 'loginapp',
});

connection.connect((error) => {
  if (error) {
    console.error('An error occurred while connecting to the DB');
    throw error;
  }
  console.log('Connected to the database');
});

// Enable JSON body parsing middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'root',
  password: '771270sw',
  database: 'sessiondb', // Create a separate database for session storage
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
});

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Middleware for authentication
const authenticate = (req, res, next) => {
  if (req.session.user) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated, redirect to login or send an error response
    res.status(401).send('Unauthorized');
  }
};

// Protected route example
app.get('/dashboard', authenticate, (req, res) => {
  res.send('Welcome to the dashboard');
});

// Validation functions
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6;
}

// User registration endpoint
app.post('/register', (req, res) => {
  const { fullName, email, username, password } = req.body;

  // Validate email
  if (!validateEmail(email)) {
    res.status(400).send('Invalid email!');
    return;
  }

  // Validate password
  if (!validatePassword(password)) {
    res.status(400).send('Invalid password! It must be at least 6 characters long.');
    return;
  }

  // Insert the new user into the 'users' table
  const sql = 'INSERT INTO users (fullName, email, username, password) VALUES (?, ?, ?, ?)';
  connection.query(sql, [fullName, email, username, password], (error, results) => {
    if (error) {
      console.error('An error occurred while executing the query');
      throw error;
    }

    res.json({ status: 'Success', message: 'Registration successful' });
  });
});

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('An error occurred while executing the query');
      throw error;
    }

    if (results.length > 0) {
      // Store user session
      req.session.user = results[0];
      res.send('Logged in successfully');
    } else {
      res.status(400).send('Invalid username or password');
    }
  });
});

// Logout endpoint
app.get('/logout', (req, res) => {
    // Destroy the session on the server
    req.session.destroy((error) => {
      if (error) {
        console.error('An error occurred while destroying the session');
        throw error;
      }
  
      // Clear the session ID cookie on the client
      res.clearCookie('connect.sid');
      res.send('Logged out successfully');
    });
  });  

// Email update endpoint
app.post('/updateEmail', (req, res) => {
  const { id, newEmail } = req.body;

  connection.query('UPDATE users SET email = ? WHERE id = ?', [newEmail, id], (error, results) => {
    if (error) {
      console.error('An error occurred while executing the query');
      throw error;
    }
    res.send('Email updated successfully');
  });
});

// Password update endpoint
app.post('/updatePassword', (req, res) => {
  const { id, newPassword } = req.body;

  connection.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, id], (error, results) => {
    if (error) {
      console.error('An error occurred while executing the query');
      throw error;
    }
    res.send('Password updated successfully');
  });
});

// Password reset endpoint (this example assumes the new password is sent in the request, but typically you'd generate a random one or a password reset token)
app.post('/resetPassword', (req, res) => {
  const { email, newPassword } = req.body;

  connection.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], (error, results) => {
    if (error) {
      console.error('An error occurred while executing the query');
      throw error;
    }
    res.send('Password reset successfully');
  });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
