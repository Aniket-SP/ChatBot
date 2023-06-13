

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;

    // Send the login request to the api
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({username: username}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message == 'Login successful.') {
            // Store the JWT token in local storage
            localStorage.setItem('jwtToken', data.jwtToken);

            // Generate a unique session ID
            const sessionId = uuidv4();
            localStorage.setItem('session_id', sessionId);

            // Redirect to a new page or perform other actions
            window.location.href = '/chat';
        }
        {
            // Display error message as a popup
            const popupMessage = document.createElement('div');
            popupMessage.classList.add('popup-message');
            popupMessage.textContent = data.message;
            document.body.appendChild(popupMessage);

            // Show the popup
            popupMessage.classList.add('show-popup');

            // Hide the popup after 5 seconds
            setTimeout(() => {
                popupMessage.classList.remove('show-popup');
                document.body.removeChild(popupMessage);
            }, 4000);
        }
    })
    //.catch(error => console.error('Error:', error));
});



export * from './login_support.js';