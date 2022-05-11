/* Import word list */
import words from "./words.js";


/* Variables */
const word = words[Math.floor(Math.random() * words.length)];
const shuffled = word.split("").sort(function(){return 0.5-Math.random()}).join("");
const keyboardButtons = document.getElementById("letters").children;

let indexWord = 0,
    indexLetter = 0;

let maxTries = 2;

/* Functions */
function verifyWord(){
    let inputWord = "";
    for (const div of document.getElementById("word").children[indexWord].children){ inputWord += div.innerHTML; }

    if (inputWord.length < 7) return;

    for (let i = 0; i < word.length; i++) {
        if (word[i] == inputWord[i]){
            document.getElementById("word").children[indexWord].children[i].classList.add("correct");
        }else{
            document.getElementById("word").children[indexWord].children[i].classList.add("wrong");
        }
    }

    if (inputWord == word || indexWord == maxTries - 1){
        document.getElementById("modal").style.display = "flex";
        document.getElementById("what").innerHTML = word;
    }

    indexLetter = 0;
    indexWord += 1;
}


/* Loads letters */
let avoidDoubles = "";
for (let i = 0; i < shuffled.length; i++) {
    if (!avoidDoubles.includes(shuffled[i])){
        const newButton = document.createElement("button");
        newButton.innerHTML = shuffled[i];
        document.getElementById("letters").append(newButton);
        avoidDoubles += shuffled[i];
    }
}


/* Typing */
for (const button of keyboardButtons){
    button.addEventListener("click", () => {
        if (indexLetter > 6 || indexWord > maxTries - 1) return;

        const activeLetter = document.getElementById("word").children[indexWord].children[indexLetter];
        activeLetter.innerHTML = button.innerHTML;
        indexLetter += 1;
    });
}


/* Delete + Enter */
document.getElementById("delete").addEventListener("click", () => {
    if (indexLetter <= 0) return;

    indexLetter -= 1;
    const activeLetter = document.getElementById("word").children[indexWord].children[indexLetter];
    activeLetter.innerHTML = "";
});

document.getElementById("enter").addEventListener("click", () => { verifyWord(); })