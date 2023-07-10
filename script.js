let countdown;
let timerDisplay = document.querySelector(".countdown-timer");
let timeRemaining;

function formatTime(time) {
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function updateCountdown() {
  timerDisplay.innerHTML = formatTime(timeRemaining);

  if (timeRemaining <= 0) {
    clearInterval(countdown);
    timerDisplay.innerHTML = '0:00:00:00';
    showOverlay();
  } else {
    timeRemaining--;
  }
}

function startTimer() {
  const days = parseInt(document.querySelector("#days").value) || 0;
  const hours = parseInt(document.querySelector("#hours").value) || 0;
  const minutes = parseInt(document.querySelector("#minutes").value) || 0;
  const seconds = parseInt(document.querySelector("#seconds").value) || 0;
  const totalTime = days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;

  const inputFields = document.querySelectorAll(".form-input");
  inputFields.forEach((input) => {
    if (input.value.trim() !== "") {
      input.classList.add("hidden");
    }
  });

  if (isNaN(totalTime) || totalTime <= 0) {
    alert("Please enter a valid time");
    return;
  }

  timeRemaining = totalTime;
  clearInterval(countdown);
  updateCountdown();
  countdown = setInterval(updateCountdown, 1000);

  // Store the countdown time in a cookie
  document.cookie = `countdownTime=${timeRemaining}; expires=${new Date(
    Date.now() + totalTime * 1000
  ).toUTCString()}`;
}

function showOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("black-bg");
  document.body.appendChild(overlay);
}

function hideOverlay() {
  const overlay = document.querySelector(".black-bg");
  if (overlay) {
    overlay.remove();
  }
}



function resetTimer() {
  clearInterval(countdown);
  timerDisplay.innerHTML = "0:00:00:00";
  document.querySelector("#days").value = "";
  document.querySelector("#hours").value = "";
  document.querySelector("#minutes").value = "";
  document.querySelector("#seconds").value = "";
  timeRemaining = 0;

  const inputFields = document.querySelectorAll(".form-input");
  inputFields.forEach((input) => {
    input.classList.remove("hidden");
  });

  // Clear the countdown time cookie
  document.cookie =
    "countdownTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.querySelector(".start-btn").addEventListener("click", startTimer);
document.querySelector(".reset-btn").addEventListener("click", resetTimer);

// Check if there is a stored countdown time in the cookie
const storedTime = document.cookie.replace(
  /(?:(?:^|.*;\s*)countdownTime\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
if (storedTime) {
  timeRemaining = parseInt(storedTime);
  const days = Math.floor(timeRemaining / (3600 * 24));
  const hours = Math.floor((timeRemaining % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  document.querySelector("#days").value = days;
  document.querySelector("#hours").value = hours;
  document.querySelector("#minutes").value = minutes;
  document.querySelector("#seconds").value = seconds;
  countdown = setInterval(updateCountdown, 1000);
}
