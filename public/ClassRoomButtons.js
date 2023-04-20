document.addEventListener("DOMContentLoaded", () => {


  let player;

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

        const myBaloon = document.getElementById('SpeechBubble')
        myBaloon.textContent = "No one does better than me!";

        if (myBaloon.style.display === "none") {
          myBaloon.style.position = "absolute";
          myBaloon.style.display = "block";
          myBaloon.style.animationName = "expand-bounce";
          myBaloon.style.animationDuration = "3.25s";
        } else {
          myBaloon.style.animationName = "shrink";
          myBaloon.style.animationDuration = "0.1s";
    
          setTimeout(() => {
            myBaloon.style.display = "none";
          }, 100);
        }

        
        
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
        const text = messageDivs[messageDivs.length - 1].textContent.replace('Gatson:', '').trim();
        const utterance = new SpeechSynthesisUtterance(text);

        console.log("trying to speak: " + text.replace('Gatson:', '').trim())
    


      
        // Set the voice properties (optional)
        // You can customize the voice, rate, pitch, and volume
        utterance.voice = speechSynthesis.getVoices()[0];
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
      
        speechSynthesis.speak(utterance);
      });

      document.getElementById('cornoId').addEventListener('click', () => {


        const myvideoWrapper = document.getElementById('video-wrapper');
        if (myvideoWrapper.style.display === 'none') {

          const myBaloon = document.getElementById('SpeechBubble')
          myBaloon.textContent = "No one does better than me!";

        if (myBaloon.style.display === "none") {
          myBaloon.style.position = "absolute";
          myBaloon.style.display = "block";
          myBaloon.style.animationName = "expand-bounce";
          myBaloon.style.animationDuration = "3.25s";
        } else {
          myBaloon.style.animationName = "shrink";
          myBaloon.style.animationDuration = "0.1s";
    
          setTimeout(() => {
            myBaloon.style.display = "none";
          }, 100);
        }

        const quadroElement = document.getElementById('quadroId');
        if (quadroElement) {
            quadroElement.style.display = 'none';
        }
        
        const gastonImage = document.querySelector('.gaston-image');
        gastonImage.classList.add('gaston-image-move-left-2nd');
        gastonImage.classList.remove('gaston-image-move-right-2nd')
        
      } else {

        // move right 

        const quadroElement = document.getElementById('quadroId');
        if (quadroElement) {
            quadroElement.style.display = 'block';
        }

        pauseVideo();
        console.log("trying to move right")
        chatBox.setAttribute('hidden', '');
        const gastonImage = document.querySelector('.gaston-image');
        gastonImage.classList.add('gaston-image-move-right-2nd');
        gastonImage.classList.remove('gaston-image-move-left-2nd')
      }

      const videoWrapper = document.getElementById('video-wrapper');
      const toggleVideo = document.getElementById('toggle-video');
  
          if (videoWrapper.style.display === 'none') {
              videoWrapper.style.display = 'block';
              loadYouTubeVideo(); // Function to load the YouTube video
          } else {
              videoWrapper.style.display = 'none';
          }
        })



function loadYouTubeVideo() {
    const videoContainer = document.getElementById('video-container');
    
    // Check if the video is already loaded
    if (videoContainer.innerHTML !== '') {
        return;
    }

    // Replace the video ID with your desired video ID
    const videoId = 'NzK5MutYGJg';

    // Update the player variable to store the player instance
    player = new YT.Player(videoContainer, {
        height: '390',
        width: '640',
        videoId: videoId,
        playerVars: {
            'autoplay': 1, // Enable autoplay
            'controls': 1 // Show player controls
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
  
  function onPlayerReady(event) {
      // You can use this function to perform any action when the player is ready
  }
  
  function onPlayerStateChange(event) {
      // You can use this function to perform any action when the player state changes
  }
    

  function muteVideo() {
    if (player && player.isMuted && !player.isMuted()) {
        player.mute();
    }
}

function unMuteVideo() {
    if (player && player.isMuted && player.isMuted()) {
        player.unMute();
    }
}

function pauseVideo() {
    if (player && player.pauseVideo) {
        player.pauseVideo();
    }
}


  });