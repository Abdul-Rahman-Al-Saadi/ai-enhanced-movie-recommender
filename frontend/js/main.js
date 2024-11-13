
const fetchMovies = async () => {
    
    const response = await fetch("http://localhost/ai-enhanced-movie-recommender/server/getMovies.php");
    if(response.ok){
        console.log("successful");
    }else {
        console.log("unsuccessful")
    }
    const data = await response.json();

    // console.log(data);
    return data;

}
// let user_id = 3;
export const user_id = 3;
const container = document.querySelector('.container');

const createCards = async () => {
    
    const movies = await fetchMovies();
    console.log(movies);
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
        console.log(movie);
        // const flatWonder = flattenObject(wonder);
        // const queryString = new URLSearchParams(flatWonder).toString();
        anchor.href = `details.html`;
        anchor.addEventListener('click', () => {
            localStorage.setItem('movie', JSON.stringify(movie));
        });
        

        container.appendChild(parentDiv);
    };
};
createCards();