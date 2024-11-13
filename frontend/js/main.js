
// const fetchMovies = async () => {
    
//     const response = await fetch("http://localhost/ai-enhanced-movie-recommender/server/getMovies.php");
//     if(response.ok){
//         console.log("successful");
//     }else {
//         console.log("unsuccessful")
//     }
//     const data = await response.json();

//     // console.log(data);
//     return data;

// }
// let user_id = 3;

const container = document.querySelector('.container');
    if (!container) {
        console.error("Container element not found!");
    }

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if (!container) {
        console.error("Container element not found!");
        return;
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost/ai-enhanced-movie-recommender/server/getMovies.php");
            if (response.ok) {
                console.log("successful");
                const data = await response.json();
                return data;
            } else {
                console.log("unsuccessful");
                return [];
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    };

    const createCards = async () => {
        const movies = await fetchMovies();
        console.log(movies);
        if (movies.length === 0) {
            console.log("No movies to display");
            return;
        }

        for (const movie of movies) {
            const parentDiv = document.createElement('div');
            const img = document.createElement('img');
            const anchor = document.createElement('a');
            const h3 = document.createElement('h3');
            const childDiv = document.createElement('div');

            childDiv.append(img);
            parentDiv.append(childDiv, h3, anchor);

            parentDiv.classList = 'card';
            anchor.innerText = "More Details";
            img.classList = 'card-img';
            h3.classList = 'wonder-name';

            img.src = movie.banner_url;
            h3.innerText = movie.title;
            anchor.href = `details.html`;

            anchor.addEventListener('click', () => {
                localStorage.setItem('movie', JSON.stringify(movie));
            });

            container.appendChild(parentDiv);
        }
    };

    createCards();
});
let user_id = 3; 
localStorage.setItem('user_id', user_id);
