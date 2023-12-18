const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const submitTestimonialFunction = require('./netlify/functions/submitTestimonial');


const app = express();
const PORT = process.env.PORT || 3000;

// MySQL Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this based on your requirements
    host: 'aws.connect.psdb.cloud',
    user: 'hhyp6dujl3p38u81ixla',
    password: 'pscale_pw_Sloclnj83hWTllvnzvAumBvFS5XCutuoWlNPLOKP4pP',
    database: 'student_testimonials'
});

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle form submissions
app.post('/netlify/functions/submitTestimonial', (req, res) => {
    const { name, email, role, category, story } = req.body;
    const sql = 'INSERT INTO testimonials (name, email, role, category, story) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, role, category, story];

    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }

        // Insert the testimonial into the database
        connection.query(sql, values, (queryErr, result) => {
            // Release the connection back to the pool
            connection.release();

            if (queryErr) {
                console.error('Error inserting into MySQL:', queryErr);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
                return;
            }

            console.log('Testimonial inserted into MySQL:', result);
            res.json({ success: true, message: 'Testimonial submitted successfully' });
        });
    });
});

// Endpoint to retrieve testimonials from the database
app.get('/netlify/functions/testimonials', (req, res) => {
    // Use the connection pool to query the database
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
