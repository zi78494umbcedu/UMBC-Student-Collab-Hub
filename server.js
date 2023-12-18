const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Use Pool instead of createConnection
const pool = new Pool({
    user: 'ashwin',
    host: 'scaled-canine-6605.g8z.cockroachlabs.cloud',
    database: 'defaultdb',
    password: 'y4VGudCsMKTPsjBlK52nFA',
    port: 26257
});

//Connect to CockroachDB (PostgreSQL)
pool.connect((err) => {
    if (err) {
        console.log('Error connecting to CockroachDB:', err);
        return;
    }
    console.log('Connected to CockroachDB');
});

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle form submissions
app.post('/submitTestimonial', (req, res) => {
    const { name, email, role, category, story } = req.body;
    const sql = 'INSERT INTO testimonials (name, email, role, category, story) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, role, category, story];

    // Insert the testimonial into the database
    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting into CockroachDB:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }
        console.log('Testimonial inserted into CockroachDB:', result);
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

// ... (rest of your routes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
