const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function addMessage(sender, message) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function dragonResponse(input) {
  input = input.toLowerCase();
  if (input.includes("joke")) {
    return "Why did the dragon cross the road? To burn the chicken on the other side!";
  } else if (input.includes("dragon fact")) {
    return "Some dragons sleep on gold piles because they're fireproof and fabulous 💰🔥";
  } else if (input.includes("code fact")) {
    return "Did you know? Python was named after Monty Python, not the snake 🐍";
  } else if (input.includes("hi") || input.includes("hello")) {
    return "Hewwo! I'm Abayo, your dino-dragon buddy! 🐉🦕";
  } else if (input === "bye") {
    if (input === "bye") {
  document.body.innerHTML = `
    <div style="background:black; color:red; font-size:24px; text-align:center; height:100vh;
      display:flex; justify-content:center; align-items:center; flex-direction:column;">
      <audio autoplay src="https://www.soundjay.com/nature/sounds/dinosaur-roar-01.mp3"></audio>
      <div style="font-size:80px;">🔥</div>
      <div>ROAAAAR!! 🔥🔥🔥</div>
      <div>Goodbye, little coder...</div>
    </div>`;
  return "";
}
  } else {
    return "Hmm... Abayo doesn't understand that. Try asking for a joke, a dragon fact, or a code fact! 🐲";
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("You", input);
  const response = dragonResponse(input);
  if (response) {
    setTimeout(() => addMessage("Abayo 🐉🦕", response), 500);
  }

  userInput.value = "";
});
