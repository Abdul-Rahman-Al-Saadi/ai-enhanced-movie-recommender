// Get modal elements
var registerModal = document.getElementById("register-modal");
var signinModal = document.getElementById("signin-modal");

// Get button elements
var registerBtn = document.getElementById("register-btn");
var signinBtn = document.getElementById("signin-btn");

// Get close elements
var registerClose = document.getElementById("register-close");
var signinClose = document.getElementById("signin-close");

// When the user clicks on the "Register" button, open the modal
registerBtn.onclick = function() {
    registerModal.style.display = "block";
}

// When the user clicks on the "Sign In" button, open the modal
signinBtn.onclick = function() {
    signinModal.style.display = "block";
}

// When the user clicks on <span> (x), close the register modal
registerClose.onclick = function() {
    registerModal.style.display = "none";
}

// When the user clicks on <span> (x), close the sign-in modal
signinClose.onclick = function() {
    signinModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
    if (event.target == signinModal) {
        signinModal.style.display = "none";
    }
}
