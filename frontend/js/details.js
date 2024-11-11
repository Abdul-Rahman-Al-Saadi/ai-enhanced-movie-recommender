let isLoggedIn = false;


// toggeling the visibility of bookmark
function toggleVisibility(element){
    element.style.display = (element.style.display === "none" || element.style.display === "" ) ? "block" : "none";
}
function openForm(){
    mainElement.classList.add('blurred');
    document.getElementById('myForm').style.display = 'block';
}
function closeForm(){
    document.getElementById('myForm').style.display = 'none';
}

const formPopup = document.getElementById('myForm');
const mainElement = document.querySelector('main');

const cancelBtn = document.querySelector('.cancel');
cancelBtn.addEventListener('click', () =>{
    mainElement.classList.remove('blurred');
    toggleVisibility(formPopup);
})

const bookmarkIcon = document.getElementById('bookmark-icon');
document.getElementById('bookmark-btn').addEventListener('click', () =>{
    isLoggedIn ? toggleVisibility(bookmarkIcon) : openForm();
})

// styling and saving the star rating
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const submitButton = document.getElementById('submit-rating');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const value = parseInt(star.getAttribute('data-value'));
            highlightStars(value);
        });

        star.addEventListener('mouseout', function() {
            if (selectedRating === 0) {
                resetStars();
            } else {
                highlightStars(selectedRating);
            }
        });

        star.addEventListener('click', function() {
            selectedRating = parseInt(star.getAttribute('data-value'));
            updateRatingDisplay();
            submitButton.disabled = false;
            submitButton.classList.add('enabled');
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
        ratingValueElement.textContent = selectedRating;
        highlightStars(selectedRating);
    }
});


