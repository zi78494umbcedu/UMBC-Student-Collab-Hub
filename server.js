//server.js

const express = require('express');
const session = require('express-session');
const cors = require('cors'); // Add this line
const path = require('path');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'student_testimonials'
});

connection.connect();

app.get('/testimonials', (req, res) => {
    connection.query('SELECT * FROM testimonials', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

const app = express();
app.use(cors());
const registeredUsers = [];
var __dirname = '/Users/ashwingupta/Desktop/SENG-701 Capstone/Git/BetaFrontend/UMBC-Student-Collab-Hub';
app.use(express.static(__dirname+ '/images'));

// Add this endpoint to handle user registration
app.post('/register', express.json(), (req, res) => {
    const { username, email, password } = req.body;

    // Store user details in memory (in a real application, you'd use a database)
    registeredUsers.push({ username, email, password });

    // You can send a response back to the client if needed
    res.json({ message: 'Registration successful' });
    res.redirect('/index.html');
});



app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});
//Use express-session middleware
app.use(session({
    secret:'ashwin',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}));

//Endpoint to set up a session
app.set('/login', (req, res)=>{
    req.session.user = { username: 'exampleUser'};
    res.send('Logged in successfully!');
});

//Endpoint to check the session status
app.get('/checkSession', (req, res)=>{

    const loggedIn = !!req.session.user;
    res.json({ loggedIn });
});

const PORT = process.env.PORT || 3000;

//Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});