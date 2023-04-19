const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');
const clearButton = document.getElementById('clear-button');
const exportButton = document.getElementById('export-button');

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const userAge = getQueryParam('age');

console.log("My age: " + userAge);

messageForm.addEventListener('submit', async event => {
  event.preventDefault();
  const message = messageInput.value.trim();


  if (message) {

    addTextToChat(message);

    try {
      const response = await fetch('/api-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, userAge }) // Include age in the request body
      });


      const data = await response.json();

      addTextToChat(data.response)

    } catch (error) {
      console.error('Error fetching chat response:', error);
    }
  }
});

function addTextToChat(text){

  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = text;
  chatBox.appendChild(messageElement);
  messageInput.value = "";


}




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