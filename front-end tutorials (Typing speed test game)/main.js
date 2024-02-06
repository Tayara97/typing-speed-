/*
array for each lvl########check
-save result on Localstorage with the time########check
-select box for levels ########check
-more functions
-instructions 
  first word only wil be + 6s
*/

const Allwords = {
  Easy: [
    "Html",
    "Chat",
    "Code",
    "Index",
    "Tayara",
    "Elzero",
    "Web",
    "stack",
    "Code",
    "Css",
    "React",
    "Next",
    "Home",
  ],
  Normal: [
    "Writing",
    "Coding",
    "School",
    "Academy",
    "thinking",
    "Problem",
    "Projects",
    "Dollars",
    "Remotely",
    "Solving",
    "Critical",
  ],
  Hard: [
    "Full Stack",
    "Full Stack",
    "Back End",
    "Codezella",
    "TypeScript",
    "JavaScript",
    "Freelance",
    "Programming",
    "Front End",
  ],
};

const lvls = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

//lvls and seconds)
/*###########*/
let container = document.querySelector(".game .container");
let optionsLevel = document.querySelector(".select-box");
let defaultlvl = "Easy";
let lvlspanName = document.querySelector(".message #lvls");
let defaultSeconds = lvls[defaultlvl];
let secondsSpan = document.querySelector(".message #seconds");
let timeLeft = document.querySelector(".control .time #time-left");
let totalwords = document.querySelector(".control .score #total-words");
// select box

// input field
let input = document.querySelector(".container .input");
let upCommingWords = document.querySelector(".container .upcoming-words");
//random word
let theWord = document.querySelector(".container .the-word");
//score and finish
let scorespan = document.querySelector(".control .score #scores");
let finishmsg = document.querySelector(".container .finish");
totalwords.innerHTML = Allwords[defaultlvl].length;
//Start game*********
let startButton = document.querySelector(".container .btn");
startButton.onclick = function () {
  this.remove();
  input.focus();
  optionsLevel.style.display = "none";
  genWords();
};
optionsLevel.onchange = function (e) {
  defaultlvl = e.target.value;
  defaultSeconds = lvls[e.target.value];
  lvlspanName.innerHTML = defaultlvl;
  secondsSpan.innerHTML = defaultSeconds;
  timeLeft.innerHTML = defaultSeconds;
  totalwords.innerHTML = Allwords[defaultlvl].length;
};
//localstorage
let dateNow = new Date();

// disable paste Event
input.onpaste = function () {
  return false;
};

function genWords() {
  let randomWord =
    Allwords[defaultlvl][
      Math.floor(Math.random() * Allwords[defaultlvl].length)
    ];

  let wordIndex = Allwords[defaultlvl].indexOf(randomWord);
  Allwords[defaultlvl].splice(wordIndex, 1);
  //show random word
  theWord.innerHTML = randomWord;
  upCommingWords.innerHTML = "";
  for (let i = 0; i < Allwords[defaultlvl].length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(Allwords[defaultlvl][i]);
    div.appendChild(txt);
    upCommingWords.appendChild(div);
  }
  startPlaying();
}

//start playing function
function startPlaying() {
  timeLeft.innerHTML = defaultSeconds;
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(start);
      //comparing
      if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        input.value = "";
        scorespan.innerHTML++;
        if (Allwords[defaultlvl].length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let txt = document.createTextNode("congratulations");
          span.appendChild(txt);
          finishmsg.appendChild(span);
          upCommingWords.remove();
          window.localStorage.setItem("Result", scorespan.innerHTML);

          window.localStorage.setItem("Date", dateNow);
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let txt = document.createTextNode("Game Over");
        span.appendChild(txt);
        finishmsg.appendChild(span);
        window.localStorage.setItem("Result", scorespan.innerHTML);

        window.localStorage.setItem("Date", new Date());
      }
    }
  }, 1000);
}
