document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".gaston-icon").addEventListener("click", () => {
  
  
      console.log("Event triggered")
      const speechBubble = document.querySelector("#SpeechBubble");
  
      //speechBubble.style.display = "none";
  
      if (speechBubble.style.display === "none") {
        speechBubble.style.display = "block";
        speechBubble.style.animationName = "expand-bounce";
        speechBubble.style.animationDuration = "3.25s";
      } else {
        speechBubble.style.animationName = "shrink";
        speechBubble.style.animationDuration = "0.1s";
  
        setTimeout(() => {
          speechBubble.style.display = "none";
        }, 100);
      }
    });
  
    const quadroId = document.getElementById("quadroId");
  
    if (!quadroId) {
      console.error("Image element not found.");
      return;
    }
  
    quadroId.addEventListener("click", function() {
      console.log("Image clicked");
      const chatBox = document.getElementById('chat-box');

      if (chatBox.hasAttribute('hidden')) {
          console.log("trying to move left")
        // move left
        chatBox.removeAttribute('hidden');
        
        const gastonImage = document.querySelector('.gaston-image');
        gastonImage.classList.add('gaston-image-move-left-2nd');
        gastonImage.classList.remove('gaston-image-move-right-2nd')
        
      } else {

        // move right 

        console.log("trying to move right")
        chatBox.setAttribute('hidden', '');
        const gastonImage = document.querySelector('.gaston-image');
        gastonImage.classList.add('gaston-image-move-right-2nd');
        gastonImage.classList.remove('gaston-image-move-left-2nd')
      }

    });

    if ('speechSynthesis' in window) {
        console.log('Your browser supports the Web Speech API.');
      
      } else {
        console.log('Sorry, your browser does not support the Web Speech API.');
      }

      document.getElementById('speak').addEventListener('click', function() {
        const parentDiv = document.querySelector('#chat-box');
        const messageDivs = parentDiv.querySelectorAll('.message');
        const text = messageDivs[messageDivs.length - 1].textContent;
        const utterance = new SpeechSynthesisUtterance(text);

        console.log("trying to speak: " + text)
      
        // Set the voice properties (optional)
        // You can customize the voice, rate, pitch, and volume
        utterance.voice = speechSynthesis.getVoices()[0];
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
      
        speechSynthesis.speak(utterance);
      });

    
  });