const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');
const clearButton = document.getElementById('clear-button');
const exportButton = document.getElementById('export-button');





messageForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    messageInput.value = '';
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
  a.download = 'Lesson_with_Gaston.txt';
  a.click();
});


  