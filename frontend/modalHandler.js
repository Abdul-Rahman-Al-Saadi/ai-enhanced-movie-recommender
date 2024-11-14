// Handle Register form submission
document.querySelector("#register-modal").onsubmit = function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = new FormData(event.target);

    fetch("./register.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            document.getElementById("register-modal").style.display = "none";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
};

// Handle Sign In form submission
document.querySelector("#signin-modal").onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch("./signin.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            document.getElementById("signin-modal").style.display = "none";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
};

// Close modals when clicking the close button
document.getElementById("register-close").onclick = function() {
    document.getElementById("register-modal").style.display = "none";
};

document.getElementById("signin-close").onclick = function() {
    document.getElementById("signin-modal").style.display = "none";
};
