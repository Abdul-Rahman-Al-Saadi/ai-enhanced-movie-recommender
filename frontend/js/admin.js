const usersBtn = document.getElementById('users_btn');
const activitiesBtn = document.getElementById('activities_btn');
const logoutBtn = document.getElementById('logout_btn');
const usersSection = document.getElementById('users_section');

const username = document.getElementById('username');
const useremail = document.getElementById('useremail');
const usertype = document.getElementById('usertype');
const useraccess = document.getElementById('useraccess');



usersBtn.style.backgroundColor = "#C0C0C0";



logoutBtn.addEventListener('click', function () {
    // Log out functionality
});

fetch('http://localhost/ai-enhanced-movie-recommender/server/getUsers.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.message) {
            console.log(data.message);
        } else {
            data.forEach(user => {
                const userContainer = document.createElement('div');
                userContainer.classList.add('user-container');

                const userNameElement = document.createElement('p');
                userNameElement.classList.add('flex', 'center', 'info');
                userNameElement.textContent = user.username;
                username.appendChild(userNameElement);

                const userEmailElement = document.createElement('p');
                userEmailElement.classList.add('flex', 'center', 'info');
                userEmailElement.textContent = user.email;
                useremail.appendChild(userEmailElement);

                const userTypeElement = document.createElement('p');
                userTypeElement.classList.add('flex', 'center', 'info');
                userTypeElement.textContent = user.type ? user.type : 'Unknown';
                usertype.appendChild(userTypeElement);

                const toggleContainer = document.createElement('div');
                toggleContainer.classList.add('toggle-container');

                const toggleSwitch = document.createElement('input');
                toggleSwitch.type = 'checkbox';
                toggleSwitch.classList.add('toggle-switch');
                toggleSwitch.checked = user.type === 'blocked';


                toggleSwitch.dataset.userId = user.user_id;

                toggleSwitch.addEventListener('change', () => {
                    const newType = toggleSwitch.checked ? 'blocked' : 'regular';

                    fetch('http://localhost/ai-enhanced-movie-recommender/server/changeUsertype.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ user_id: toggleSwitch.dataset.userId, type: newType })
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(updateResponse => {
                            console.log(updateResponse.message);
                        })
                        .catch(error => {
                            console.error('Error updating user type:', error);
                        });
                });

                toggleContainer.appendChild(toggleSwitch);
                userContainer.appendChild(toggleContainer);
                document.getElementById('useraccess').appendChild(userContainer);
            });
        }
    })
    .catch(error => {
        console.log("There was a problem with the fetch operation:", error);
    });


