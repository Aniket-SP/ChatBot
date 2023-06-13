// import rest_controller;


// Get DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const mode = document.getElementById('darkmode');

// Function to add dark and light mode
mode.addEventListener('click', function () {
    var id = document.getElementById("id");
    var chatcont = document.getElementById("chat-container");
    var msgtext = document.getElementsByClassName("message-text");
    var msginput = document.getElementById("message-input");
    var sndbtn = document.getElementById("send-button");
    var bdy = document.getElementsByTagName("body");
    var alert = document.getElementsByClassName("alert")[0];
    if (id.classList.contains("dark-mode")) {
        alert.classList.remove("dark-mode");
        alert.classList.add("light-mode");
        mode.classList.remove("dark-mode");
        mode.classList.add("light-mode");
        id.classList.remove("dark-mode");
        id.classList.add("light-mode");
        chatcont.classList.remove("dark-mode");
        chatcont.classList.add("light-mode");
        for (var i = 0; i < msgtext.length; i++) {
            msgtext[i].classList.remove("dark-mode");
            msgtext[i].classList.add("light-mode");
        }
        msginput.classList.remove("dark-mode");
        msginput.classList.add("light-mode");
        sndbtn.classList.remove("dark-mode");
        sndbtn.classList.add("light-mode");
        document.body.style.backgroundColor = "#76a1b7";
        document.getElementById("chat-header").style.color = "#76a1b7";
    } else {
        alert.classList.remove("light-mode");
        alert.classList.add("dark-mode");
        mode.classList.remove("light-mode");
        mode.classList.add("dark-mode");
        id.classList.remove("light-mode");
        id.classList.add("dark-mode");
        chatcont.classList.remove("light-mode");
        chatcont.classList.add("dark-mode");
        for (var i = 0; i < msgtext.length; i++) {
            msgtext[i].classList.remove("light-mode");
            msgtext[i].classList.add("dark-mode");
        }
        msginput.classList.remove("light-mode");
        msginput.classList.add("dark-mode");
        sndbtn.classList.remove("light-mode");
        sndbtn.classList.add("dark-mode");
        document.body.style.backgroundColor = 'rgb(' + 152 + ',' + 153 + ',' + 163 + ')';
        document.getElementById("chat-header").style.color = "#ffffff";
    }
});

// Function to add a new message
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;

    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    if(mode.classList.contains("dark-mode"))
        messageText.classList.add("dark-mode");
    else
        messageText.classList.add("light-mode");
    messageText.innerText = message;

    messageElement.appendChild(messageText);
    chatMessages.appendChild(messageElement);

    // Scroll to the bottom of the chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for send button click
sendButton.addEventListener('click', function () {
    const message = messageInput.value;

    if (message.trim() !== '') {
        addMessage(message, 'user');
        // Simulate chatbot response
        setTimeout(function() {
            // var result = rest_controller(message);
            fetch('/process_string', {
                method: 'POST',
                body: JSON.stringify({ stringData: message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.result);
                addMessage(data.result, 'chatbot');
            }); }, 500);
        messageInput.value = '';
    }
    else{
        checkString();
    }
});

// Event listener for Enter key press in the message input
messageInput.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        sendButton.click();
    }
});

function checkString() {
    var customAlert = document.getElementById("customAlert");
    customAlert.style.display = "block";
    setTimeout(function () {
        customAlert.style.display = "none";
    }, 1000); // Hide the alert after 3 seconds
}


// Example: Add some initial messages
//addMessage('Hello!', 'user');
addMessage('Hey! How can I assist you today?', 'chatbot');