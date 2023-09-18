const chatContainer = document.getElementById('chat-container');
const chat = document.getElementById('chat');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to display a message in the chat
function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chat.appendChild(messageDiv);
}

// Function to send a user message to the server and display the response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display the user message in the chat
    displayMessage(userMessage, 'user');

    // Send the user message to the server
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    });

    if (response.ok) {
        const data = await response.json();
        const botMessage = data.message;

        // Display the bot's response in the chat
        displayMessage(botMessage, 'bot');
    }

    // Clear the user input field
    userInput.value = '';
}

// Send a message when the user clicks the send button
sendButton.addEventListener('click', sendMessage);

// Send a message when the user presses Enter
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

const chatToggle = document.getElementById('chat-toggle');
let isChatOpen = false;

// Function to toggle the chat widget
function toggleChatWidget() {
    isChatOpen = !isChatOpen;
    chatWidget.classList.toggle('open', isChatOpen);
    chatToggle.textContent = isChatOpen ? 'Close' : 'Open';
}

// Toggle the chat widget when the "Open" button is clicked
chatToggle.addEventListener('click', toggleChatWidget);
