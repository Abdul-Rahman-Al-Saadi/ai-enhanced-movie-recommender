document.addEventListener("DOMContentLoaded", () => {
    const chatButton = document.getElementById("chat-button");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeButton = document.getElementById("close-chat");
    const sendButton = document.getElementById("send-button");
    const chatDisplay = document.getElementById("chat-display");
    const chatInput = document.getElementById("chat-input");

    chatButton.addEventListener("click", () => {
        chatButton.style.display = "none"; 
        chatbotContainer.style.display = "block"; 
    });

    sendButton.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", async (e) => {
        if (e.key === "Enter" && chatInput.value.trim()) {
            sendMessage();
        }
    });

    closeButton.addEventListener("click", () => {
        chatbotContainer.style.display = "none"; 
        chatButton.style.display = "block"; 
    });

    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return; 

        displayMessage( userMessage, chatDisplay, true);

        chatInput.value = "";

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer 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`, // Replace with your actual API key
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userMessage }]
                })
            });

            const data = await response.json();
            const botReply = data.choices[0]?.message?.content || "Sorry, I didn’t understand that.";
            displayMessage(botReply, chatDisplay);
        } catch (error) {
            displayMessage("Bot: An error occurred. Please try again.", chatDisplay);
        }
    }

    function displayMessage(text, display, isUser = false) {
        const message = document.createElement('p');
        message.classList.add(isUser ? 'user-message' : 'bot-message');
        message.textContent = text;
        display.appendChild(message);
        display.scrollTop = display.scrollHeight; 
    }
});