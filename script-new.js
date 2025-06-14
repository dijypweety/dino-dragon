const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const dragonSprite = document.getElementById("dragon-sprite")
const OPENAI_API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxx";

function updateMemoryFromInput(input) {
  const lc = input.toLowerCase();

  const ignoreList = ["hi", "hello", "how are you", "bye", "roar", "joke", "code fact", "dragon fact"];
  if (ignoreList.includes(lc)) return null;

  if (lc.startsWith("your name is ")) {
    const newName = input.split("your name is ")[1].trim();
    abayoMemory.name = newName;
    localStorage.setItem("abayoMemory", JSON.stringify(abayoMemory));
    return `${newName}? I love it! From now on, that’s me 🐲💙`;
  }

  if (lc.startsWith("you like ") || lc.startsWith("you are ")) {
    abayoMemory.facts.push(input);
    localStorage.setItem("abayoMemory", JSON.stringify(abayoMemory));
    return `Okay! I'll remember that: "${input}" 🤓`;
  }

  return null;
}


  if (input.toLowerCase().startsWith("your name is ")) {
    const newName = input.split("your name is ")[1].trim();
    abayoMemory.name = newName;
    localStorage.setItem("abayoMemory", JSON.stringify(abayoMemory));
    return `${newName}? I love it! From now on, that’s me 🐲💙`;
  }

  const trainedReply = updateMemoryFromInput(input);
if (trainedReply) {
  addMessage(abayoMemory.name, trainedReply);
  userInput.value = "";
  return;
}

  if (input.toLowerCase().startsWith("you like ") || input.toLowerCase().startsWith("you are ")) {
    abayoMemory.facts.push(input);
    localStorage.setItem("abayoMemory", JSON.stringify(abayoMemory));
    return `Okay! I'll remember that: "${input}" 🤓`;
  }

  return null;
}

function addMessage(sender, message) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;  
  speak(message);
}
function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = 'en-US';
  window.speechSynthesis.speak(speech);
}

function setMood(mood) {
  if (mood === "fire") {
    dragonSprite.src = "https://i.ibb.co/sVvhMGX/dragon-fire.gif";
  } else if (mood === "happy") {
    dragonSprite.src = "https://i.ibb.co/zPW9ZVH/dragon-happy.png";
  } else if (mood === "sleepy") {
    dragonSprite.src = "https://i.ibb.co/yNfkKwm/dragon-sleepy.png";
  }
}

function dragonResponse(input) {
    input = input.toLowerCase();
  if (input.includes("hi") || input.includes("hello")) {
  return "Hewwo! I'm Abayo, your dino-dragon buddy! 🐉🦕";
}

  if (input.includes("joke")) {
    setMood("happy");
    return "Why did the dragon cross the road? To burn the chicken on the other side!";
  } else if (input.includes("dragon fact")) {
    setMood("happy");
    return "Some dragons sleep on gold piles because they're fireproof and fabulous 💰🔥";
  } else if (input.includes("code fact")) {
    return "Did you know? Python was named after Monty Python, not the snake 🐍";
  } else if (input.includes("how are you")) {
    setMood("happy");
    return "I'm soaring high and breathing fire! 🔥 How about you?";
  } else if (
    input.includes("who created you") || input.includes("your creator") ||
    input.includes("who is your creator") || input.includes("origin") || input.includes("your story")
  ) {
    return "I was created by a curious human named dijypweety 👩🏽‍💻 — born from code, curiosity, and a little fire 🔥. I started as a simple chatbot, but evolved into a dino-dragon with jokes, wisdom, and a spark of personality.";
  } else if (input.includes("sleep")) {
    setMood("sleepy");
    return "Zzz... dragons need naps too. 💤";
  } else if (input.includes("roar")) {
    setMood("fire");
    return "ROOOOAAARRR!!! 🔥🔥🔥";
  } else if (input === "bye") {
    document.body.innerHTML = `
      <div style="position:fixed; top:0; left:0; width:100vw; height:100vh;
        background:black; color:red; font-size:24px; text-align:center;
        display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <audio autoplay src="https://www.soundjay.com/nature/sounds/dinosaur-roar-01.mp3"></audio>
        <div style="font-size:80px;">🔥</div>
        <div style="margin:10px 0;">ROAAAAR!! 🔥🔥🔥</div>
        <div>Goodbye, little coder...</div>
      </div>`;
    return "";
    
  } else {
    return "Hmm... Abayo doesn't understand that.}

  return null;
} Try asking for a joke, a dragon fact, or a code fact! 🐲";
  }
}

function suggest(text) {
  userInput.value = text;
  userInput.focus();
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function(event) {
    const voiceInput = event.results[0][0].transcript;
    userInput.value = voiceInput;
    chatForm.requestSubmit();
  };
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


