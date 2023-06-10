var headerEl = document.querySelector("header");
var mainEl = document.querySelector("main");
var timerEl = document.querySelector(".count-down");
var headingEl;
var subHeadingEl;
var buttonEl;
var timerEl;
var theQuizEl;
var quiz;

phaseOne();

function phaseOne() {
    phaseOneHeading();
    phaseOneInstructions();
    phaseOneButton();
}

function phaseTwo() {
    headingEl.remove();
    subHeadingEl.remove();
    buttonEl.remove();
    timerEl.textContent = quizTimer.runtime;

    askQuestion = 1;
    quizHolder();
    showQuestion();
    showPrompts();
    /* phaseThree(); */

}

function phaseThree() {

    while (theQuizEl.firstChild) {
        theQuizEl.removeChild(theQuizEl.firstChild);
    }
    phaseOne();
}

function phaseOneHeading() {
    headingEl = document.createElement("h1");
    headingEl.textContent = "Coding Quiz Challenge"
    mainEl.append(headingEl);
}

function phaseOneInstructions() {
    subHeadingEl = document.createElement("h3");
    subHeadingEl.classList.add("instructions")
    subHeadingEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalise your score/time by ten seconds!"
    mainEl.append(subHeadingEl);
}

function phaseOneButton() {
    buttonEl = document.createElement("button");
    buttonEl.classList.add("start-button");
    buttonEl.textContent = "Start Quiz"
    buttonEl.addEventListener("click", phaseTwo);
    mainEl.append(buttonEl);
}

function quizHolder() {
    theQuizEl = document.createElement("div");
    theQuizEl.classList.add("framework");
    mainEl.append(theQuizEl)

}

function showQuestion() {
    subHeadingEl = document.createElement("h3");
    subHeadingEl.classList.add("questions")
    subHeadingEl.textContent = quiz[askQuestion].question;
    theQuizEl.append(subHeadingEl);
}

function showPrompts() {
    for (var i = 0; i < quiz[askQuestion].prompts.length; i++) {
        buttonEl = document.createElement("button");
        buttonEl.classList.add("prompt");
        buttonEl.textContent = (i+1)+". "+quiz[askQuestion].prompts[i]
        theQuizEl.append(buttonEl);
    }
}