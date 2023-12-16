// travel_recommendation.js

function loadPage(page) {
    const contentContainer = document.getElementById('content-container');

    switch (page) {
        case 'home':
            contentContainer.innerHTML = `
                <div class="home-page">
                    <!-- ... (existing code) -->
                </div>
                <div class="recommendations-results" id="recommendations-results">
                    <!-- JavaScript will dynamically add content here -->
                </div>
            `;
            fetchRecommendations();
            break;

        case 'about':
            contentContainer.innerHTML = `
                <div class="about-page">
                    <h2>About Us</h2>
                    <p>Information about the company and the team members.</p>
                </div>
            `;
            break;

        case 'contact':
            contentContainer.innerHTML = `
                <div class="contact-page">
                    <h2>Contact Us</h2>
                    <form>
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            `;
            break;
    }
}

function fetchRecommendations() {
    const apiUrl = 'https://restcountries.com/v3.1/all';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const recommendations = data.map(country => ({
                name: country.name.common,
                type: 'country',
                image: country.flags.svg,
                description: `Explore the beauty of ${country.name.common}.`
            }));

            displayRecommendations(recommendations);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayRecommendations(data) {
    const resultsContainer = document.getElementById('recommendations-results');
    resultsContainer.innerHTML = '';

    data.forEach(recommendation => {
        const recommendationItem = document.createElement('div');
        recommendationItem.classList.add('recommendation-item');

        recommendationItem.innerHTML = `
            <img src="${recommendation.image}" alt="${recommendation.name}">
            <h3>${recommendation.name}</h3>
            <p>${recommendation.description}</p>
        `;

        resultsContainer.appendChild(recommendationItem);
    });
}

function searchRecommendations() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.toLowerCase();

    if (keyword.trim() !== '') {
        fetchRecommendations(keyword);
    }
}

function clearResults() {
    const resultsContainer = document.getElementById('recommendations-results');
    resultsContainer.innerHTML = '';
}

function displayTime() {
    const timeDisplay = document.getElementById('time-display');
    const recommendedCountryTime = new Date().toLocaleString('en-US', { timeZone: 'COUNTRY_TIME_ZONE', timeStyle: 'medium', hourCycle: 'h24' });

    timeDisplay.innerHTML = `
        <p>Current time in the recommended country:</p>
        <p>${recommendedCountryTime}</p>
    `;
}
