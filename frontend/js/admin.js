
const usersBtn = document.getElementById('users_btn');
const activitiesBtn = document.getElementById('activities_btn');
const logoutBtn = document.getElementById('logout_btn');
const usersSection = document.getElementById('users_section');
const activitiesSection = document.getElementById('activities_section');

activitiesSection.style.display = "none";
usersBtn.style.backgroundColor = "#C0C0C0";


usersBtn.addEventListener('click', function() {
    usersBtn.style.backgroundColor = "#C0C0C0";
    activitiesBtn.style.backgroundColor = "#D9D9D9";
    usersSection.style.display = "flex";
    activitiesSection.style.display = "none";
});


activitiesBtn.addEventListener('click', function() {
    activitiesBtn.style.backgroundColor = "#C0C0C0";
    usersBtn.style.backgroundColor = "#D9D9D9";
    usersSection.style.display = "none";
    activitiesSection.style.display = "flex";
});

logoutBtn.addEventListener('click', function() {
    
});

