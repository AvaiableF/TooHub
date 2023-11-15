// State to keep track of generated compliments
var generatedCompliments = [];

// Variable to store the number of available compliments
var availableCompliments = elogios_en.length;

// Function to generate a random compliment
function generateCompliment() {
  // Check if all compliments have been generated
  if (generatedCompliments.length === elogios_en.length) {
    // Reset the state of generated compliments
    generatedCompliments = [];
  }

  // Check if all compliments have been generated again after the reset
  if (generatedCompliments.length === elogios_en.length) {
    alert("All compliments have been generated. Please restart the program to generate again.");
    return;
  }

  // Check if there are available compliments
  if (availableCompliments === 0) {
    alert("No more compliments available.");
    return;
  }

  var compliment;

  // Keep generating a random compliment until it's not in the generated compliments state
  do {
    var randomIndex = Math.floor(Math.random() * elogios_en.length);
    compliment = elogios_en[randomIndex];
  } while (generatedCompliments.includes(compliment));

  // Add the generated compliment to the generated compliments state
  generatedCompliments.push(compliment);

  document.getElementById("phrase").textContent = compliment;

  // Copy the compliment to the clipboard
  navigator.clipboard.writeText(compliment);

  // Display notification
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Copied Compliment!", { body: "The compliment has been copied to the clipboard." });
  }

  // Update the recent list of 3 generated compliments
  updateRecentComplimentsList();

  // Update the available compliments counter
  availableCompliments--;

  // Update the remaining compliments counter
  updateCounter();
}

// Function to update the remaining compliments counter
function updateCounter() {
  var counter = elogios_en.length - generatedCompliments.length;
  document.getElementById("counter").textContent = "Compliments remaining: " + counter;
}

// Function to update the recent list of 3 generated compliments
function updateRecentComplimentsList() {
  var list = document.getElementById("recent-list");
  list.innerHTML = "";

  // Show the recent 3 generated compliments, if any
  var recentCompliments = generatedCompliments.slice(-3);
  for (var i = recentCompliments.length - 1; i >= 0; i--) {
    var compliment = recentCompliments[i];
    var item = document.createElement("li");
    item.textContent = compliment;
    list.appendChild(item);
  }
}

// Request permission to display notifications
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Associate the generateCompliment function with the "Generate Phrase" button
document.getElementById("generate-button").addEventListener("click", generateCompliment);

window.addEventListener("DOMContentLoaded", function () {
  var versionNumberElement = document.getElementById("version-number");
  versionNumberElement.innerText = "1.2.4"; // Put your current version here

  // Display the initial available compliments counter
  updateCounter();
});
