const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');
const clearButton = document.getElementById('clear-button');
const exportButton = document.getElementById('export-button');


messageForm.addEventListener('submit', async event => {
  event.preventDefault();
  const message = messageInput.value.trim();

  console.log("My message is: " + message);

  if (message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    messageInput.value = '';

    try {
      const result = await fetch('http://localhost:3000/ClassRoom', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, age: localStorage.getItem('age') }),
      });
      const data = await result.json();

      // we are here 

      console.log("The data reiceved is: " + data);


      chatBox.textContent = data.response;
  } catch (error) {
    chatBox.textContent = 'Error: Unable to get a response.';
  }

  }
});


clearButton.addEventListener('click', () => {
  chatBox.innerHTML = '';
});


exportButton.addEventListener('click', () => {
  const messages = chatBox.querySelectorAll('.message');
  const text = Array.from(messages).map(message => message.textContent).join('\n');
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Todays_Lesson_With_Gaston.txt';
  a.click();
});