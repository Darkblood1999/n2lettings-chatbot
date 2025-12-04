document.body.innerHTML += `
    <div id="chatbot-btn">Chat with us</div>
    <div id="chat-window">
        <div id="messages"></div>
        <div id="message-input">
            <input type="text" id="userMessage" placeholder="Type your message..." />
            <button onclick="sendMessage()">Send</button>
        </div>
    </div>
`;

document.getElementById("chatbot-btn").onclick = () => {
    document.getElementById("chat-window").style.display = "flex";
};

async function sendMessage() {
    let msg = document.getElementById("userMessage").value;
    if (!msg) return;

    appendMessage("user", msg);
    document.getElementById("userMessage").value = "";

    try {
        let response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        let data = await response.json();
        appendMessage("bot", data.reply);

    } catch (err) {
        appendMessage("bot", "⚠️ Server error — could not reach AI backend.");
    }
}

function appendMessage(sender, text) {
    let messages = document.getElementById("messages");
    let div = document.createElement("div");
    div.style.margin = "8px 0";
    div.innerHTML = `<b>${sender === "user" ? "You" : "Assistant"}:</b> ${text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
