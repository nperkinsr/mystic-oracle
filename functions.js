// Helper function to capitalize each word in the name courtsey of Angela
function capitalizeName(name) {
  return name
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

// Function to generate 5 unique lucky numbers between 1 and 100 in increasing order
function generateLuckyNumbers() {
  let luckyNumbers = [];
  while (luckyNumbers.length < 5) {
    let num = Math.floor(Math.random() * 100) + 1; // Adding plus one or else it would be 0-99
    if (!luckyNumbers.includes(num)) {
      luckyNumbers.push(num);
    }
  }

  // Define a comparator function that compares two numbers
  function compareNumbers(a, b) {
    if (a < b) {
      return -1; // a should come before b
    } else if (a > b) {
      return 1; // a should come after b
    } else {
      return 0; // a and b are equal
    }
  }

  // Sort the luckyNumbers array in ascending order using the comparator function
  luckyNumbers.sort(compareNumbers);
  return luckyNumbers;
}

// Function to reveal the future
function revealFuture() {
  // Get the user's name, trim spaces, and capitalize it properly
  let nameInput = document.querySelector(".name-field").value.trim();
  if (nameInput === "") {
    alert("Please enter your name!");
    return;
  }
  let name = capitalizeName(nameInput);

  // Get a random prediction using the capitalized name
  let predictionText = getRandomPrediction(name);
  let luckyNumbers = generateLuckyNumbers();

  // Updates the prediction content in the DOM
  document.querySelector(".prediction").textContent = predictionText;
  document.querySelector(".lucky-numbers").textContent =
    luckyNumbers.join(", ");

  // Displays the prediction overlay
  document.getElementById("oracle").style.display = "block";

  // Play the first 3 seconds of the preloaded spell.wav file because I'm tooo lazy to cut the sound file m'self
  let spellAudio = document.getElementById("spellAudio");
  spellAudio.currentTime = 0; // Reset to start in case it's been played before
  spellAudio.play();
  setTimeout(() => {
    spellAudio.pause();
    spellAudio.currentTime = 0;
  }, 3000);
}

// Function to hide the prediction overlay and clear the text area... should have added it to my other projects as well
function hidePrediction() {
  document.getElementById("oracle").style.display = "none";
  // Clear the text area when the overlay is closed
  document.querySelector(".name-field").value = "";
}

// Add event listeners for the reveal and close actions
document
  .querySelector(".reveal-button")
  .addEventListener("click", revealFuture);
document.querySelector(".close-btn").addEventListener("click", hidePrediction);
