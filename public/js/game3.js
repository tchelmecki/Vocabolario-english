// Array of Polish words and their English translations
const words = [
  { polish: "słońce", english: "sun" },
  { polish: "kot", english: "cat" },
  { polish: "pies", english: "dog" },
  { polish: "dom", english: "house" },
  { polish: "drzewo", english: "tree" },
  { polish: "samochód", english: "car" },
  { polish: "mleko", english: "milk" },
  { polish: "telefon", english: "phone" },
  { polish: "książka", english: "book" },
  { polish: "okno", english: "window" },
];

// Get elements from HTML
const wordElement = document.getElementById("word1");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const newGameButton = document.getElementById("new-game");
const correctAnswersList = document.getElementById("correct-answers");
const incorrectAnswersList = document.getElementById("incorrect-answers");

let currentWordIndex = 0;
let score = 0;
let correctAnswers = [];
let incorrectAnswers = [];

// Shuffle the words array
shuffleArray(words);

// Set the initial word
setWord(words[currentWordIndex]);

// Listen for the submit button click
submitButton.addEventListener("click", function() {
const answer = answerElement.value.trim().toLowerCase();
const currentWord = words[currentWordIndex];
if (answer === currentWord.english) {
resultElement.textContent = "Correct!";
resultElement.className = "correct";
score++;
correctAnswers.push(currentWord);
} else {
resultElement.textContent = "Incorrect! The correct answer is " + currentWord.english + ".";
resultElement.className = "incorrect";
incorrectAnswers.push(currentWord);
}

// Increment the current word index and check if we've reached the end of the array
currentWordIndex++;
if (currentWordIndex === words.length) {
// End of game - show score and reset gam
alert("Game over! You scored " + score + " out of " + words.length + ".");
resetGame();
} else {
// Next word
setWord(words[currentWordIndex]);
answerElement.value = "";
}
});

// Listen for the new game button click
newGameButton.addEventListener("click", function() {
resetGame();
});

function setWord(word) {
wordElement.textContent = word.polish;
}

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}

function resetGame() {
// Reset variables and shuffle words array
currentWordIndex = 0;
score = 0;
correctAnswers = [];
incorrectAnswers = [];
shuffleArray(words);
// Reset UI elements
setWord(words[currentWordIndex]);
answerElement.value = "";
resultElement.textContent = "";
resultElement.className = "";
correctAnswersList.innerHTML = "";
incorrectAnswersList.innerHTML = "";
}