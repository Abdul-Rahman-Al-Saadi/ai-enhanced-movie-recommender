
// For fetching the movies
    const fetchMovies = async () => {
        try {
            const response = await fetch("http://localhost/ai-enhanced-movie-recommender/server/getMovies.php");
            if (response.ok) {
                console.log("successful");
                const data = await response.json();
                createCards(data);
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

    const fetchUserActivities = async () => {
        try {
            const user_id = 2;
            const queryString = new URLSearchParams({user_id}).toString();
            const response = await fetch(`http://localhost/ai-enhanced-movie-recommender/server/getUserActivities.php?${queryString}`);
            if (response.ok) {
                console.log("successful");
                const data = await response.json();
                console.log(data);
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

    function getIdAndTitle(movies){
        const data = movies;
        
        for (let key in data) {
        if (data.hasOwnProperty(key)) { 
            const { movie_id, title } = data[key];
            movieList.push({ movie_id, title });
        }
        }
        return movieList;
    }

    async function createCards(movies) {
    
        const container = document.querySelector('.card-container');
        console.log(movies);
        for (const movie of movies) {
            const parentDiv = document.createElement('div');
            const img = document.createElement('img');
            const anchor = document.createElement('a');
            const h3 = document.createElement('h3');
            const childDiv = document.createElement('div');
            childDiv.append(img);
            parentDiv.append(childDiv,anchor, h3);
            
            parentDiv.classList = 'card';
            anchor.innerText = "";
            anchor.style.cursor = 'pointer';
    
            
            h3.innerText = '';
            img.src = await movie.banner_url;
            console.log(movie);
            anchor.href = "./pages/details.html";
            img.addEventListener('click', () => {
                localStorage.setItem('movie', JSON.stringify(movie));
                window.location.href = './pages/details.html';
            });
            
    
            container.appendChild(parentDiv);
        };
    };
    
    const movieList = [];
    const movies = fetchMovies();
    
    const idMovieList = getIdAndTitle(movies);
    const userInteractions = fetchUserActivities();
    console.log("idListmovies movies", idMovieList);

    const prompt = `
    I have a list of movies with their IDs:
    ${idMovieList.map(movie => `${movie.id}: ${movie.title}`).join("\n")}
  
    The user has interacted with the following movies IDs:
    ${userInteractions}
  
    Based on the movies the user has interacted with, suggest 10 other movie IDs that the user may enjoy, considering genres, themes, and overall similarity. Sort them from the most recommended to the least. Provide only the movie IDs as a pure Json format.
    `;


// Inside the dynamic creation of movies
    // const anchor = document.createElement('a');
    // anchor.href = `details.html`;
    // anchor.addEventListener('click', () => {
    //     localStorage.setItem('movie', JSON.stringify(movie));
    // });


// For the passage of User to details page
    // let user_id = 3; 
    // localStorage.setItem('user_id', user_id);


    async function callOpenAI() {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', 
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that recommends movies based on user interactions.'
                      },
                    { 
                        role: "user", 
                        content: prompt 
                    }]
            })
        });
    
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }
    
        let data = await response.json();
        data = data.choices[0].message.content; 
        // recommendedMoviesIDs = data;
        awaitValues(data);
        return data;
    }
    
    
    function awaitValues(data){
        console.log(data);
        const movie_ids = JSON.parse(data);
        console.log(movie_ids);
    }
    callOpenAI();

    
    
