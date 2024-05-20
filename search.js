// Array of searchable items
const searchableItems = [
    "College Formalities",
    "Events and Dates",
    "Emergency Services",
    "Food and Restaurants",
    "Alumni Committee GSA",
    "Baltimore and Around",
    "Forum Posts and Comments",
    "Legal Formalities",
    "Transitions and Conveyances",
    "Finance and Taxes",
    "Housing",
    "Academic",
    "Job",
    "Experience",
    "Register",
    "Facebook",
    "LinkedIn",
    "Instagram",
    "Prospective Students",
    "Incoming Students",
    "Current Students",
    "Alumni Students",
    "Interview Preparation",
    "Professional Networking",
    "Job Market Research",
    "Professional Development",
    "Job Search Tools",
    "Cultural Considerations",
    "Work-Life Balance",
    "Job Retention Tips",
    "Community Engagement",
    "Feedback and Adaptation",
    "Internship Guidance",
    "Job Search Strategies",
    "Visa and Work Authorization",
    "Resumes and Cover Letters"
    // Add other sections, pages, and social media links as needed
];

// Function to filter items based on user input
function filterItems(query) {
    return searchableItems.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Function to handle search bar input
function handleSearchInput() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const recommendationList = document.getElementById("recommendationList");

    // Clear previous search results
    searchResults.innerHTML = "";
    recommendationList.innerHTML = "";

    // Get user input
    const query = searchInput.value;

    // If the input is empty, hide the recommendation dropdown
    if (!query.trim()) {
        recommendationList.style.display = "none";
        return;
    }

    // Filter items based on the input
    const filteredItems = filterItems(query);

    /* Display autocomplete suggestions
    filteredItems.forEach(item => {
        const resultItem = document.createElement("div");
        resultItem.textContent = item;
        resultItem.addEventListener("click", () => handleSearchResultClick(item));
        searchResults.appendChild(resultItem);
    });*/
    // Display autocomplete suggestions in the recommendation dropdown
    filteredItems.forEach(item => {
        const recommendationItem = document.createElement("li");
        recommendationItem.textContent = item;
        recommendationItem.addEventListener("click", () => handleSearchResultClick(item));
        recommendationList.appendChild(recommendationItem);
    });
    // Show or hide the recommendation dropdown based on the presence of recommendations
    recommendationList.style.display = filteredItems.length > 0 ? "block" : "none";    
    
    // Show the container if there are results
    searchResultsContainer.style.display = filteredItems.length > 0 ? "block" : "none";

}

// Function to handle click on search result
function handleSearchResultClick(item) {
    // Define the mapping of search items to their corresponding links or pages
    const searchItemMappings = {
        "College Formalities": "info.html?section=collegeFormalities",
        "Events and Dates": "info.html?section=eventsAndDates",
        "Emergency Services": "info.html?section=emergencyServices",
        "Food and Restaurants": "info.html?section=foodAndRestaurants",
        "Alumni Committee GSA": "info.html?section=alumniCommitteeGSA",
        "Baltimore and Around": "info.html?section=baltimoreAndAround",
        "Forum Posts and Comments": "info.html?section=forumPostsAndComments",
        "Legal Formalities": "info.html?section=legalFormalities",
        "Transitions and Conveyances": "info.html?section=transitionsAndConveyances",
        "Finance and Taxes": "info.html?section=financeAndTaxes",
        "Housing": "Housing.html",
        "Academic": "Academic.html",
        "Job": "Job.html",
        "Experience": "Experience.html",
        "Register": "register.html",
        "Facebook": "https://www.facebook.com/groups/UMBC.EKTA/",
        "LinkedIn": "https://www.linkedin.com/in/ekta-at-umbc-98210b103",
        "Instagram": "https://www.instagram.com/ekta_umbc/",
        "Prospective Students": "Academic.html?section=prospectiveStudents",
        "Incoming Students": "Academic.html?section=incomingStudents",
        "Current Students": "Academic.html?section=currentStudents",
        "Alumni Students": "Academic.html?section=alumniStudents",
        "Interview Preparation": "Job.html?section=interviewPreparation",
        "Professional Networking": "Job.html?section=professionalNetworking",
        "Job Market Research": "Job.html?section=jobMarketResearch",
        "Professional Development": "Job.html?section=professionalDevelopment",
        "Job Search Tools": "Job.html?section=jobSearchTools",
        "Cultural Considerations": "Job.html?section=culturalConsiderations",
        "Work-Life Balance": "Job.html?section=workLifeBalance",
        "Job Retention Tips": "Job.html?section=jobRetentionTips",
        "Community Engagement": "Job.html?section=communityEngagement",
        "Feedback and Adaptation": "Job.html?section=feedbackAndAdaptation",
        "Internship Guidance": "Job.html?section=internshipGuidance",
        "Job Search Strategies": "Job.html?section=jobSearchStrategies",
        "Visa and Work Authorization": "Job.html?section=visaAndWorkAuthorization",
        "Resumes and Cover Letters": "Job.html?section=resumesAndCoverLetters"
    };
    
    // Check if the item exists in the mapping
    if (searchItemMappings[item]) {
        // Redirect to the corresponding page or link
        const page = searchItemMappings[item];
        navigateToSection(page, item);
    } else {
        // Handle other cases or provide a default action
        console.log(`No link found for ${item}`);
    }
}

// Function to navigate to a specific section
function navigateToSection(page, sectionId) {
    // Redirect to the specified page with a query parameter
    window.location.href = `${page}`;
}
// Function to handle search bar input and display recommendation list
function showRecommendations() {
    const searchInput = document.getElementById("searchInput");
    const recommendationList = document.getElementById("recommendationList");

    // Clear previous recommendations
    recommendationList.innerHTML = "";

    // Get user input
    const query = searchInput.value;

    // Filter items based on the input
    const filteredItems = filterItems(query);

    // Display autocomplete suggestions
    filteredItems.forEach(item => {
        const recommendationItem = document.createElement("li");
        recommendationItem.textContent = item;
        recommendationItem.addEventListener("click", () => handleSearchResultClick(item));
        recommendationList.appendChild(recommendationItem);
    });

    // Show or hide the recommendation dropdown based on the presence of recommendations
    recommendationList.style.display = filteredItems.length > 0 ? "block" : "none";
}