// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// 1. Get references to the necessary DOM elements
const posts = document.querySelectorAll('.post'); // Select all post elements
const errorModal = document.getElementById('error-modal'); // Get the error modal
const errorMessage = document.getElementById('error-message'); // Get the error message span

// 2. Add the 'hidden' class to the error modal so it doesn't appear when the page first loads.
// This is typically done directly in the HTML, but including it here as a safeguard
// or if the HTML isn't directly modifiable for this step in your setup.
if (errorModal) {
    errorModal.classList.add('hidden');
}

// 3. Iterate over each post to add event listeners
posts.forEach(post => {
    const likeButton = post.querySelector('.like-button'); // Get the like button for each post
    const heart = likeButton.querySelector('.heart');     // Get the heart icon
    // const likesCount = post.querySelector('.likes-count'); // Optional: if you also want to update a numerical likes count

    if (likeButton && heart) { // Ensure elements exist before adding listeners
        likeButton.addEventListener('click', () => {
            // When a user clicks on a heart
            if (heart.textContent === EMPTY_HEART) {
                // When a user clicks on an empty heart:
                // Invoke mimicServerCall to simulate making a server request 
                mimicServerCall()
                    .then(() => {
                        // When the "server" returns a success status: 
                        heart.textContent = FULL_HEART; // Change the heart to a full heart 
                        heart.classList.add('activated-heart'); // Add the activated-heart class to make the heart appear red 
                        // Note: "Do not make the heart full until you're inside a successful .then block." 
                        // Optional: if (likesCount) likesCount.textContent = parseInt(likesCount.textContent) + 1;
                    })
                    .catch(error => { // Respond to the error using a .catch(() => { }) block 
                        // When the "server" returns a failure status: 
                        if (errorModal && errorMessage) {
                            errorModal.classList.remove('hidden'); // Display the error modal by removing the hidden class 
                            errorMessage.textContent = error; // Display the server error message in the modal 

                            // Use setTimeout to hide the modal after 3 seconds (add the hidden class) 
                            setTimeout(() => {
                                errorModal.classList.add('hidden');
                            }, 3000);
                        }
                    });
            } else {
                // When a user clicks on a full heart: 
                heart.textContent = EMPTY_HEART; // Change the heart back to an empty heart 
                heart.classList.remove('activated-heart'); // Remove the activated-heart class 
                // Optional: if (likesCount) likesCount.textContent = parseInt(likesCount.textContent) - 1;
            }
        });
    }
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}