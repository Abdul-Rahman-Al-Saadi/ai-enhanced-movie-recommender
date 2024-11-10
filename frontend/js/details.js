// toggeling the visibility of bookmark
function toggleVisibility(element){
    element.style.display = (element.style.display === "none") ? "block" : "none";
}

const bookmarkIcon = document.getElementById('bookmark-icon');
document.getElementById('bookmark-btn').addEventListener('click', () =>{
    toggleVisibility(bookmarkIcon);
})

document.addEventListener('DOMContentLoaded', function() {
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

    submitButton.addEventListener('click', function() {
        alert(`You rated this movie ${selectedRating} stars!`);
    });
});

