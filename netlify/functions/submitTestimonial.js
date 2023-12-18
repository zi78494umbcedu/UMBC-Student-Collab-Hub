// experience.js
// Function to submit testimonial
const submitTestimonial = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const roleInput = document.getElementById('role');
    const categoryInput = document.getElementById('category');
    const storyInput = document.getElementById('story');

    const name = nameInput.value;
    const email = emailInput.value;
    const role = roleInput.value;
    const category = categoryInput.value;
    const story = storyInput.value;
    try {
        const response = await fetch('https://ektaumbc.netlify.app/submitTestimonial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, role, category, story }),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            // Optionally, you can clear the form fields or perform other UI updates here
            // Reset the form fields
            nameInput.value = '';
            emailInput.value = '';
            roleInput.value = '';
            categoryInput.value = '';
            storyInput.value = '';
        } else {
            alert('Testimonial submission failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting testimonial:', error);
        alert('An error occurred while submitting the testimonial.');
    }
};
// Function to fetch testimonials from the server

// Function to fetch testimonials from the server
const fetchTestimonials = async () => {
    try {
        const response = await fetch('https://ektaumbc.netlify.app/testimonials');
        const testimonials = await response.json();

        // Get the testimonial section container
        const testimonialSection = document.getElementById('testimonialSection');

        // Clear existing content
        testimonialSection.innerHTML = '';

        // Iterate through testimonials and create HTML elements
        testimonials.forEach((testimonial, index) => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.classList.add('testimonial');
            testimonialDiv.innerHTML = `
                <h3>Name: ${testimonial.name}</h3>
                <p>Role: ${testimonial.role}</p>
                <p>Category: ${testimonial.category}</p>
                <p class="excerpt-truncated">What they said: ${testimonial.story.substring(0, 50)}...</p>
                <p class="excerpt-full" style="display: none;">${testimonial.story}</p>
                <br>
                <button onclick="readMore('${index}')">Read More</button>
            `;

            // Add the testimonial div to the testimonial section
            testimonialSection.appendChild(testimonialDiv);
        });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
    }
};

// Fetch testimonials when the page loads
document.addEventListener('DOMContentLoaded', fetchTestimonials);

// Function to expand a testimonial
function readMore(testimonialIndex) {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonial = testimonials[testimonialIndex];

    const popupContainer = document.getElementById('popup-container');
    const popupContent = document.getElementById('popup-content-inner');

    // Switch between truncated and full excerpts
    const excerptTruncated = testimonial.querySelector('.excerpt-truncated');
    const excerptFull = testimonial.querySelector('.excerpt-full');

    // Create the formatted content with line breaks
    const formattedContent = `
        <h2>${testimonial.querySelector('h3').innerText}</h2><br>
        <i>
            ${testimonial.querySelector('p:nth-child(2)').innerText}<br>
            ${testimonial.querySelector('p:nth-child(3)').innerText}<br> 
            <span class="excerpt-full">What they said: ${excerptFull.innerText}</span>
        </i>`;

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
    const popupContent = document.getElementById('popup-content-inner');

    // Close the popup only if the click is outside the popup content
    if (!popupContent.contains(event.target)) {
        closePopup();
    }
}
