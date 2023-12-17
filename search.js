// Array of searchable items
const searchableItems = [
    "collegeFormalities",
    "eventsAndDates",
    "emergencyServices",
    "foodAndRestaurants",
    "alumniCommitteeGSA",
    "baltimoreAndAround",
    "forumPostsAndComments",
    "legalFormalities",
    "transitionsAndConveyances",
    "financeAndTaxes",
    "housing",
    "academic",
    "job",
    "experience",
    "Register",
    "facebook",
    "linkedin",
    "instagram",
    "prospective",
    "incoming",
    "current",
    "alumni",
    "interviewPreparation",
    "professionalNetworking",
    "jobMarketResearch",
    "professionalDevelopment",
    "jobSearchTools",
    "culturalConsiderations",
    "workLifeBalance",
    "jobRetentionTips",
    "communityEngagement",
    "feedbackAndAdaptation",
    "internshipGuidance",
    "jobSearchStrategies",
    "visaAndWorkAuthorization",
    "resumesAndCoverLetters"
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

    // Clear previous search results
    searchResults.innerHTML = "";

    // Get user input
    const query = searchInput.value;

    // Filter items based on the input
    const filteredItems = filterItems(query);

    // Display autocomplete suggestions
    filteredItems.forEach(item => {
        const resultItem = document.createElement("div");
        resultItem.textContent = item;
        resultItem.addEventListener("click", () => handleSearchResultClick(item));
        searchResults.appendChild(resultItem);
    });
     // Show the container if there are results
     searchResultsContainer.style.display = filteredItems.length > 0 ? "block" : "none";

}

// Function to handle click on search result
function handleSearchResultClick(item) {
    // Define the mapping of search items to their corresponding links or pages
    const searchItemMappings = {
        "collegeFormalities": "info.html?section=collegeFormalities",
        "eventsAndDates": "info.html?section=eventsAndDates",
        "emergencyServices": "info.html?section=emergencyServices",
        "foodAndRestaurants": "info.html?section=foodAndRestaurants",
        "alumniCommitteeGSA": "info.html?section=alumniCommitteeGSA",
        "baltimoreAndAround": "info.html?section=baltimoreAndAround",
        "forumPostsAndComments": "info.html?section=forumPostsAndComments",
        "legalFormalities": "info.html?section=legalFormalities",
        "transitionsAndConveyances": "info.html?section=transitionsAndConveyances",
        "financeAndTaxes": "info.html?section=financeAndTaxes",
        "housing": "Housing.html",
        "academic": "Academic.html",
        "job": "Job.html",
        "experience": "Experience.html",
        "Register": "register.html",
        "facebook": "https://www.facebook.com/groups/UMBC.EKTA/",
        "linkedin": "https://www.linkedin.com/in/ekta-at-umbc-98210b103",
        "instagram": "https://www.instagram.com/ekta_umbc/",
        "prospectiveStudents": "Academic.html?section=prospectiveStudents",
        "incomingStudents": "Academic.html?section=incomingStudents",
        "currentStudents": "Academic.html?section=currentStudents",
        "alumniStudents": "Academic.html?section=alumniStudents",
        "interviewPreparation": "Job.html?section=interviewPreparation",
        "professionalNetworking": "Job.html?section=professionalNetworking",
        "jobMarketResearch": "Job.html?section=jobMarketResearch",
        "professionalDevelopment": "Job.html?section=professionalDevelopment",
        "jobSearchTools": "Job.html?section=jobSearchTools",
        "culturalConsiderations": "Job.html?section=culturalConsiderations",
        "workLifeBalance": "Job.html?section=workLifeBalance",
        "jobRetentionTips": "Job.html?section=jobRetentionTips",
        "communityEngagement": "Job.html?section=communityEngagement",
        "feedbackAndAdaptation": "Job.html?section=feedbackAndAdaptation",
        "internshipGuidance": "Job.html?section=internshipGuidance",
        "jobSearchStrategies": "Job.html?section=jobSearchStrategies",
        "visaAndWorkAuthorization": "Job.html?section=visaAndWorkAuthorization",
        "resumesAndCoverLetters":"Job.html?section=resumesAndCoverLetters"
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