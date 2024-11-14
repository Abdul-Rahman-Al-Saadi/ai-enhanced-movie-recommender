
// For fetching the movies
    // const fetchMovies = async () => {
    //     try {
    //         const response = await fetch("http://localhost/ai-enhanced-movie-recommender/server/getMovies.php");
    //         if (response.ok) {
    //             console.log("successful");
    //             const data = await response.json();
    //             return data;
    //         } else {
    //             console.log("unsuccessful");
    //             return [];
    //         }
    //     } catch (error) {
    //         console.error("Error fetching movies:", error);
    //         return [];
    //     }
    // };


// Inside the dynamic creation of movies
    // const anchor = document.createElement('a');
    // anchor.href = `details.html`;
    // anchor.addEventListener('click', () => {
    //     localStorage.setItem('movie', JSON.stringify(movie));
    // });


// For the passage of User to details page
    // let user_id = 3; 
    // localStorage.setItem('user_id', user_id);

    // import OpenAI from "openai";
    // const openai = new OpenAI();

    // // openai.api_key = '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';
    // const openAIClient = new OpenAI({
    //     apiKey: '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'
    // })

    // const completion = await openAIClient.chat.completion.create({
    //     model: 'gpt-3.5-turbo',
        // messages:[
        //     {role:"user", content:"hello there"}
        // ],
    // })
    // console.log(completion);

    async function callOpenAI() {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', 
                messages: [{ "role": "user", "content": "Say this is a test!" }]
            })
        });
    
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }
    
        const data = await response.json();
        console.log(data);
    }
    
    callOpenAI();
    
    
