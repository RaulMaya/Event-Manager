const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'saulwade', 
    password: '771270sw', 
    database: 'loginapp' 
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

// User registration endpoint
app.post('/register', (req, res) => {
    const { fullName, email, username, password } = req.body;

    connection.query('INSERT INTO users SET ?', { fullname: fullName, email: email, username: username, password: password }, (error, results) => {
        if (error) {
            console.error('An error occurred while executing the query');
            throw error;
        }
        res.send('User registered successfully');
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
            res.send('Logged in successfully');
        } else {
            res.status(400).send('Invalid username or password');
        }
    });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
