const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = 3000;

// Initialize the OpenAI API client
const openai = new OpenAI({
  apiKey: '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'
});

app.use(express.static('public'));
app.use(express.json());

// Base prompt to set initial context
const basePrompt = "You are a helpful assistant. Provide information on the following topics:\n\n";

// Handle incoming chat messages
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Concatenate user's message with the base prompt
    const prompt = basePrompt + userMessage;

    // Call the OpenAI API to get a response
    try {
        const response = await openai.completions.create({
            prompt: prompt,
            max_tokens: 200, // Adjust the response length as needed
            n: 1, // Number of responses
            stop: null,
            model: 'text-davinci-003' // Specify the model here
        });

        const botMessage = response.choices[0].text;

        // Send the bot's response to the frontend
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error from OpenAI API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
