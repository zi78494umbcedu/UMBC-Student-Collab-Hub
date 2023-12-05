//index.js

const { response } = require("express");

// Initialize userLoggedIn as false (user not logged in by default)
var userLoggedIn = false;

document.addEventListener('DOMContentLoaded', function () {
    // Check the user's login status here, udpate loggedIn variable accordingly
    // checkSessionToken function
    checkSessionToken();

    // Function to check if a session token exists
    function checkSessionToken() {
        fetch('/checkSession')
            .then(response => response.json())
            .then(data => {
                // Update userLoggedIn based on the response
                userLoggedIn = data.loggedIn;
                updateUI();
            })
            .catch(error => console.error('Error checking session:', error));
    }

    // Function to update the UI based on login status
    function updateUI() {
        var userIcon = document.getElementById('userIcon');
        userIcon.innerHTML = ''; // Clear existing content

        var userImage = document.createElement('img');
        userImage.src = userLoggedIn ? '/images/user.png' : '/images/signin.png';
        userImage.alt = userLoggedIn ? 'Logged In' : 'Not Logged In';
        userIcon.appendChild(userImage);
    }
});
