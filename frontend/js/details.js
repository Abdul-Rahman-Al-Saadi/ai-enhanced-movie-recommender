// toggeling the visibility of bookmark
const bookmarkIcon = document.getElementById('bookmark-icon');
document.getElementById('bookmark-btn').addEventListener('click', () =>{
    if (bookmarkIcon.style.display === "none") {
        bookmarkIcon.style.display = "block"; 
    } else {
        bookmarkIcon.style.display = "none";
    }
})