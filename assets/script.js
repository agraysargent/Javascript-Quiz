var quizTimer = document.getElementById("timer");
var startQuizBtn = document.getElementById("startbtn");
var startQuizPage = document.getElementById("start");
var startHighScore = document.getElementById("startHighScore");
var quizBody = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var resultsEl = document.getElementById("result");
var gameoverDiv = document.getElementById("gameOver");
var scoreContainer = document.getElementById("scoreContainer");
var highScore = document.getElementById("highScore");
var scoreName = document.getElementById("scoreName");
var endGameBtn = document.getElementById("endGameBtn");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("c");

// quiz questions: variables: with question itself, choices, and answers 

var quizQuestion = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "<js>",
    choiceB: "<script>",
    choiceC: "<scripting>",
    choiceD: "<javascript>",
    correctAnswer: "B"
},
{
    question: "How do we write 'Hello World' in an Alert Box?",
    choiceA: "alertbox ('Hello World')",
    choiceB: "msg('Hello World')",
    choiceC: "alert('Hello World')",
    choiceD: "msgBox('Hello World')",
    correctAnswer: "C"
},
{
    question: "How do we write an IF statement in Javascript?",
    choiceA: "if (i==5)",
    choiceB: "if i = 5",
    choiceC: "if i ==5 then",
    choiceD: "if i = 5 then",
    correctAnswer: "A"
},
{
    question: "Who invented Javascript?",
    choiceA: "Douglas Crockford",
    choiceB: "Sheryl Sandberg",
    choiceC: "Gary Gygax",
    choiceD: "Brendan Eich",
    correctAnswer: "D"
},
{
    question: "Javascript is a ___-side programming language.",
    choiceA: "Client",
    choiceB: "Server",
    choiceC: "Both",
    choiceD: "None",
    correctAnswer: "C"
},
{
    question: "How do you find the minimum of x and y using Javascript?",
    choiceA: "min(x,y)",
    choiceB: "Math.min(x,y)",
    choiceC: "Math.min(xy)",
    choiceD: "min(xy)",
    correctAnswer: "B"
},
];

var finalQuestionTotal = quizQuestions.length;
var currentQuestionTotal = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// creating function to generate questions and answers

function generateQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionTotal === finalQuestionTotal) {
        return showScore();
    }

    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnA.innerHTML = currentQuestion.choiceA;
    btnB.innerHTML = currentQuestion.choiceB;
    btnC.innerHTML = currentQuestion.choiceC;
    btnD.innerHTML = currentQuestion.choiceD;
};

// upon starting quiz, the timer begins and will display the inital quiz question

function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizPage.style.display = "none";
    generateQuestion();

    // how the timer function works
    timerInterval = setInteral(function () {
        timeLeft--;
        quizTimer.textContent = "Time Remaining:" + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}

// upon quiz completion, the user has the option to check their total score and input their name
function score() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    scorename.value = "";
    score.innerHTML = "You got" + score + " out of " + quizQuestion.length + " correct.";
}

// by submitting your score this will display your score and previous saved scores
submitScoreBtn.addEventListener("click", function score() {
    if (scoreInputName.value === "") {
        alert("Textbox cannnot be empty!");
        return false;
    }
    else {
        var totalScores = JSON.parse(localStorage.getItem("savedScores") || [];
        var currentStudent = scoreInputName.value.trim();
        var currentScore = {
            name: currentStudent,
            score: totalScores
        };

        gameoverDiv.style.display = "none";
        scoreContainer.style.display = "flex";
        startHighScore.style.display = "block";
        endGameBtn.style.display = "flex";

        totalScores.push(currentStudent);
        localStorage.setItem("totalScores", JSON.stringify(totalScores));
        generateshowScore();
    }

});

// new function to clear user's local storage to reveal new score list
function generateScore() {
    scoreDisplayName.innerHTML = "";
    scoreDisplayScore.innerHTML = "";
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
function showScore() {
    startQuizPage.style.display = "none"
    gameoverDiv.style.display = "none";
    scoreContainer.style.display = "flex";
    highScore.style.display = "block";
    endGameBtn.style.display = "flex";

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
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionTotal){   
    score++;
        alert("That is Correct :)");
        currentQuestionIndex++;
        generateQuestion();
        // will reveal correct answer
    }else if (answer !== correct && currentQuestionTotal !== finalQuestionTotal){
        alert("That is Incorrect :(")
        currentQuestionTotal++;
        generateQuestion();
        // will reveal that the answer was incorrect
    }else {
        showScore();
    }
}

// button to begin the quiz
startQuizBtn.addEventListener("click", startQuizPage);