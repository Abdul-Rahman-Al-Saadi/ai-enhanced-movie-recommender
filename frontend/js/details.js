const user_id = localStorage.getItem('user_id');

let isLoggedIn = false;

user_id ? isLoggedIn = true : isLoggedIn = false;


// let user_id = 2;
let movie_id = 2;
let startTime;

// fillign the page according to the chosen movie
const movieData = JSON.parse(localStorage.getItem('movie'));
// console.log(movieData);

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.description').style.backgroundImage = `
    linear-gradient(to right, rgba(21, 21, 22, 1), rgba(21, 21, 22, 0)),
    linear-gradient(to top, rgba(21, 21, 22, 1), rgba(21, 21, 22, 0.3)),
    url(${movieData.banner_url})`;
    document.getElementById('movie-poster').src = movieData.banner_url;
    document.querySelector('div.description > div > h2').textContent = movieData.title;

    document.getElementById('movie-date').textContent = movieData.release_date;
    document.getElementById('movie-genre').textContent = movieData.genre;
    document.getElementById('movie-duration').textContent = movieData.duration;
    document.getElementById('movie-cast').textContent = movieData.actors;

    document.querySelector('.movie-summary p').textContent = movieData.description;
});

window.addEventListener('load', () => {startTime = Date.now()});

const sendUserActivity = async (timeSpent) => {
    try {
        const response = await fetch("http://localhost/ai-enhanced-movie-recommender/server/logUserActivity.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id,
                movie_id,
                time_spent: timeSpent,
            })
        });
        if (!response.ok) {
            throw new Error('Failed to add user activity');
        }
        const data = await response.json();
        console.log('User Activity added:', data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};

window.addEventListener('beforeunload', function () {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    console.log(`User is leaving. Time spent: ${timeSpent} seconds`);
    sendUserActivity(timeSpent);
});

// toggling the visibility of bookmark
function toggleVisibility(element){
    element.style.display = (element.style.display === "none" || element.style.display === "" ) ? "block" : "none";
}
function openForm(){
    mainElement.classList.add('blurred');
    document.getElementById('myForm').style.display = 'block';
}
function closeForm(){
    mainElement.classList.remove('blurred');
    document.getElementById('myForm').style.display = 'none';
}

const formPopup = document.getElementById('myForm');
const mainElement = document.querySelector('main');

const cancelBtn = document.querySelector('.cancel');
cancelBtn.addEventListener('click', () =>{
    closeForm(formPopup);
})

const bookmarkIcon = document.getElementById('bookmark-icon');
document.getElementById('bookmark-btn').addEventListener('click', async () => {
    if (isLoggedIn) {
        toggleVisibility(bookmarkIcon);
        try {
            const response = await fetch('http://localhost/ai-enhanced-movie-recommender/server/bookmarkController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    movie_id: movie_id,
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add bookmark');
            }
            const data = await response.json();
            console.log('Movie added:', data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    } else {
        openForm();
    }
});


// styling and saving the star rating
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const submitButton = document.getElementById('submit-rating');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            highlightStars(value);
        });

        star.addEventListener('mouseout', () => {
            if (selectedRating === 0) {
                resetStars();
            } else {
                highlightStars(selectedRating);
            }
        });

        star.addEventListener('click', async () => {
            if(isLoggedIn){
                selectedRating = parseInt(star.getAttribute('data-value'));
                updateRatingDisplay();
                console.log(selectedRating);
                try {
                    const response = await fetch('http://localhost/ai-enhanced-movie-recommender/server/ratingController.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: user_id,
                            movie_id: movie_id,
                            rating: selectedRating,
                        })
                    });
                    if (!response.ok) {
                        throw new Error('Failed to add bookmark');
                    }
                    const data = await response.json();
                    console.log('Movie added:', data);
                } catch (error) {
                    console.error('Error sending data:', error);
                }
            }else{
                openForm();
            }
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }
    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('selected');
        });
    }
    function updateRatingDisplay() {
        // ratingValueElement.textContent = selectedRating;
        highlightStars(selectedRating);
    }
});


