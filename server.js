//server.js

const express = require('express');
const session = require('express-session');
const cors = require('cors'); // Add this line
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Import Pool from 'pg'



const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://ektaumbc.netlify.app:8080',
    credentials: true,
    // Add any other CORS options you need
};

app.use(cors(corsOptions));
app.use(express.json());

const registeredUsers = [];
var __dirname = '/Users/ashwingupta/Desktop/SENG-701 Capstone/Git/BetaFrontend/UMBC-Student-Collab-Hub';

app.use(express.static(path.join(__dirname+ 'images')));
//Use express-session middleware
app.use(session({
    secret:'ashwin',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}));

// Use Pool instead of createConnection
const pool = new Pool({
    user: 'ashwin',
    host: 'scaled-canine-6605.g8z.cockroachlabs.cloud',
    database: 'defaultdb',
    password: 'y4VGudCsMKTPsjBlK52nFA', // Replace with your actual password
    port: 26257
});

/*const db = mysql.createConnection({
    host: 'scaled-canine-6605.g8z.cockroachlabs.cloud',//'localhost'
    user: 'ashwin',//'root'
    password: 'y4VGudCsMKTPsjBlK52nFA',//'root1234'
    database: 'defaultdb' //'student_testimonials'
});*/

//Connect to MySQL
pool.connect((err)=>{
    if(err){
        console.log('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

//Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Define a route to handle form submissions
app.post('/submitTestimonial', (req, res) => {
    const { name, email, role, category, story } = req.body;
    const sql = 'INSERT INTO testimonials (name, email, role, category, story) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, role, category, story];

    // Insert the testimonial into the database
    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting into MySQL:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }
        console.log('Testimonial inserted into MySQL:', result);
        res.json({ success: true, message: 'Testimonial submitted successfully' });
    });
});

// Endpoint to retrieve testimonials from the database
app.get('/testimonials', (req, res) => {
    pool.query('SELECT * FROM testimonials', (error, results) => {
        if (error) {
            console.error('Error fetching testimonials:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});
app.post('/register', express.json(), (req, res) => {
    const { username, email, password } = req.body;

    // Store user details in memory (in a real application, you'd use a database)
    registeredUsers.push({ username, email, password });

    // Send a response back to the client
    res.json({ message: 'Registration successful' });
});

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


//Endpoint to set up a session
app.post('/login', (req, res)=>{
    req.session.user = { username: 'exampleUser'};
    res.send('Logged in successfully!');
});

//Endpoint to check the session status
app.get('/checkSession', (req, res)=>{

    const loggedIn = !!req.session.user;
    res.json({ loggedIn });
});


//Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on https://ektaumbc.netlify.app:${PORT}`);
});