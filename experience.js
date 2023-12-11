// script.js

function readMore(testimonialId, name, role, category, excerpt) {
    const popupContainer = document.getElementById('popup-container');
    const popupContent = document.getElementById('popup-content-inner');

    // Create the formatted content with line breaks
    const formattedContent = `<h2>From: ${name}</h2><br><i><u>Title:</u> ${role}<br><u>Category:</u> ${category}<br><u>What they said:</u> ${excerpt}</i>`;

    // Populate popup content
    popupContent.innerHTML = formattedContent;

    // Show the popup
    popupContainer.style.display = 'block';

    // Add event listener to close popup when clicking outside the box
    popupContainer.addEventListener('click', closePopupOutside);
}

// Function to close the popup
function closePopup() {
    const popupContainer = document.getElementById('popup-container');
    popupContainer.style.display = 'none';

    // Remove the event listener when closing the popup
    popupContainer.removeEventListener('click', closePopupOutside);
}

// Function to close the popup when clicking outside the box
function closePopupOutside(event) {
    const popupContent = document.getElementById('popup-content');

    // Close the popup only if the click is outside the popup content
    if (!popupContent.contains(event.target)) {
        closePopup();
    }
}
