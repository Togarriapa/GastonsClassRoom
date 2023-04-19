
const ageForm = document.getElementById('ageQuestion');
const ageInput = document.getElementById('ageAnswer');

ageBotton.addEventListener('submitAge', () => {

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