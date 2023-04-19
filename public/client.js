document.getElementById('chat-form').addEventListener('submit', async (event) => {

    console.log("Im here")
    event.preventDefault();
    const message = document.getElementById('message').value;
    console.log("The message is: " + message)
    const responseDiv = document.getElementById('response');
    
    try {
        const result = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await result.json();
        responseDiv.textContent = data.response;
    } catch (error) {
        responseDiv.textContent = 'Error: Unable to get a response.';
    }
});
