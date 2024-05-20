function validateForm() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        alert('All fields must be filled out');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    // Send user details to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registration successful:', data);
            submitForm();
            // Redirect to the homepage
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.error('Error during registration:', error);
            // Handle the error, e.g., display an error message to the user
        });

    return false;
}


// Assuming your server is running on http://localhost:3000
const serverURL = 'http://localhost:3000';

function submitForm() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    // Validate the form data (you can add your validation logic here)

    // Make a fetch request to your server
    fetch(`${serverURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log('Registration successful:', data);

            // Redirect to the homepage
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });

    // Prevent the form from submitting the traditional way
    return false;
}
