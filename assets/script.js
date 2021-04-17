var quizTimer = document.getElementById("timer");
var startQuizBtn = document.getElementById("startbtn");
var startQuizPage = document.getElementById("start");
var startHighScore = document.getElementById("startHighScore");
var quizBody = document.getElementById("quiz");
var questionsEl = document.getElementById("question");
var feedback = document.getElementById("result");
var gameoverDiv = document.getElementById("gameOver");
var scoreContainer = document.getElementById("scoreContainer");
var highScore = document.getElementById("highScore");
var scoreName = document.getElementById("scoreName");
var submitScoreBtn = document.getElementById("submitScoreBtn")
var endGameBtn = document.getElementById("endGameBtn");
var scoreDisplayName = document.getElementById("scoreDisplayName");
var scoreDisplayScore = document.getElementById("scoreDisplayScore");
var currentQuestionIndex = 0;
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");
var scorePoints = 0;
var answerKey = document.querySelector("#answerKey");

// quiz questions: variables: with question itself, choices, and answers 

var quizQuestion = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "<js>",
    choiceB: "<script>",
    choiceC: "<scripting>",
    choiceD: "<javascript>",
    correctAnswer: "<script>"
},
{
    question: "How do we write 'Hello World' in an Alert Box?",
    choiceA: "alertbox ('Hello World')",
    choiceB: "msg('Hello World')",
    choiceC: "alert('Hello World')",
    choiceD: "msgBox('Hello World')",
    correctAnswer: "alert('Hello World')"
},
{
    question: "How do we write an IF statement in Javascript?",
    choiceA: "if (i==5)",
    choiceB: "if i = 5",
    choiceC: "if i ==5 then",
    choiceD: "if i = 5 then",
    correctAnswer: "if (i==5)"
},
{
    question: "Who invented Javascript?",
    choiceA: "Douglas Crockford",
    choiceB: "Sheryl Sandberg",
    choiceC: "Gary Gygax",
    choiceD: "Brendan Eich",
    correctAnswer: "Brendan Eich"
},
{
    question: "Javascript is a ___-side programming language.",
    choiceA: "Client",
    choiceB: "Server",
    choiceC: "Both",
    choiceD: "None",
    correctAnswer: "Both"
},
{
    question: "How do you find the minimum of x and y using Javascript?",
    choiceA: "min(x,y)",
    choiceB: "Math.min(x,y)",
    choiceC: "Math.min(xy)",
    choiceD: "min(xy)",
    correctAnswer: "Math.min(x,y)"
},
];

// global variables
var finalQuestionTotal = quizQuestion.length;
var currentQuestionTotal = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// creating function to generate questions and answers
function generateQuestion() {
    if (currentQuestionTotal === finalQuestionTotal) {
        return score();
    }
    console.log("generateQuestion")
    var currentQuestion = quizQuestion[currentQuestionIndex];
    console.log(currentQuestion)
    questionsEl.textContent = currentQuestion.question;
    btnA.textContent = currentQuestion.choiceA;
    btnB.textContent = currentQuestion.choiceB;
    btnC.textContent = currentQuestion.choiceC;
    btnD.textContent = currentQuestion.choiceD;
};

// upon starting quiz, the timer begins and will display the inital quiz question

function startQuiz() {
    console.log("startQuiz")
    gameoverDiv.style.display = "none";
    startQuizPage.style.display = "none";
    generateQuestion();

    // how the timer function works
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time Remaining:" + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            score();
        }
    }, 1000);
    quizBody.style.display = "block";
}

// upon quiz completion, the user has the option to check their total score and input their name
function score() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    score.value = "";
    score.innerHTML = "You got" + score + " out of " + quizQuestion.length + " correct.";
}

// by submitting your score this will display your score and previous saved scores
submitScoreBtn.addEventListener("click", function score() {
    if (score.value === "") {
        alert("Textbox cannnot be empty!");
        return false;
    }
    else {
        var totalScores = JSON.parse(localStorage.getItem("savedScore") || []);
        var currentStudent = score.value.trim();
        var currentScore = {
            name: currentStudent,
            score: totalScores
        };

        gameoverDiv.style.display = "none";
        scoreContainer.style.display = "flex";
        startHighScore.style.display = "block";
        endGameBtn.style.display = "flex";

        totalScores.push(currentStudent);
        localStorage.setItem("totalScore", JSON.stringify(totalScores));
        generateScore();
    }

});

startHighScore.addEventListener("click", function () {
    console.log("startHighScore")
})

// new function to clear user's local storage to reveal new score list
function generateScore() {
    scoreDisplayName.textContent = "";
    scoreDisplayScore.textContent = scorePoints;
    var highscores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;
        highscoresDisplayName.appendChild(newName);
        highscoresDisplayScore.appendChild(newScore);
    }
}

// hides the page while user is viewing scores
function showHighScore() {
    startQuizPage.style.display = "none";
    gameoverDiv.style.display = "block";
    scoreContainer.style.display = "flex";
    highScore.style.display = "block";
    endGameBtn.style.display = "flex";
    questionsEl.style.display = "none";

    generateScore();
}

// clearing local storage function
function clearScore() {
    window.localStorage.clear();
    highscoresDisplayName.textContent = "";
    highscoresDisplayScore.textContent = "";
}

function replayQuiz() {
    scoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizPage.style.display = "flex";
    time = 60;
    score = 0;
    currentQuestionTotal = 0;
}

// function check for each answer
function checkAnswer(answer) {
    console.log({ answer })
    correct = quizQuestion[currentQuestionIndex].correctAnswer;
    console.log(correct)
    console.log(currentQuestionIndex)
    if (answer.toLowerCase() === correct.toLowerCase() && currentQuestionIndex !== finalQuestionTotal) {
        score++;
        answerKey.textContent = "That is Correct :)";
        feedback.textContent = 'the correct answer is ' + correct;
        currentQuestionIndex++;
        scorePoints += 10;
        generateQuestion();
        // will reveal correct answer
    } else if (answer.toLowerCase() !== correct.toLowerCase() && currentQuestionTotal !== finalQuestionTotal) {
        answerKey.textContent = "That is Incorrect :(";
        feedback.textContent = 'the correct answer is ' + correct;
        scorePoints--;
        currentQuestionIndex++;
        currentQuestionTotal++;
        timeLeft -= 10;
        generateQuestion();

        // will reveal that the answer was incorrect
    } else {
        score();
    }
}

function btnAResponse() {
    checkAnswer(btnA.innerText)
}
function btnBResponse() {
    checkAnswer(btnB.innerText)
}
function btnCResponse() {
    checkAnswer(btnC.innerText)
}
function btnDResponse() {
    checkAnswer(btnD.innerText)
}

// button to begin the quiz
startQuizBtn.addEventListener("click", startQuiz);
btnA.addEventListener("click", btnAResponse);
btnB.addEventListener("click", btnBResponse);
btnC.addEventListener("click", btnCResponse);
btnD.addEventListener("click", btnDResponse);