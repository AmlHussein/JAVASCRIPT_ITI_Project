var programming_languages = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
      style="background-color: #4CAF50; 
      box-shadow: #5E5DF0 0 10px 20px -10px;
      border-style: none;
      color: white; 
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 12px; "
      onMouseOver="this.style.opacity='0.5'"
      onMouseOut="this.style.opacity='1'"
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';

    setTimeout(function(){ 
    document.getElementById('win').style.visibility='visible';
    document.append(document.getElementById('win'));
  }, 1000);
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;

    setTimeout(function(){ 
    document.getElementById('container').style.visibility='visible';
    document.append(document.getElementById('container'));

  }, 1000);
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  document.getElementById('container').style.visibility='hidden';
  document.removeEventListener('onclick',document.getElementById('container'));

  document.getElementById('win').style.visibility='hidden';
  document.removeEventListener('onclick',document.getElementById('win'));

  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.png';

  document.getElementById('maxWrong').innerHTML = maxWrong;
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();

}














