// Our questions object array
var questions = [
    {
        question: "Which fictional city is the home of Batman?",
        answers: ["Gotham City", "Melbourne", "Brussels", "Paris"],
        correctAnswer: "Gotham City"
    },
    {
        question: "In which sport would you perform the Fosbury Flop?",
        answers: ["Cricket", "The high jump", "Golf", "Sprint"],
        correctAnswer: "The high jump"
    },
    {
        question: "Spinach is high in which mineral?",
        answers: ["Potassium", "Calcium", "Iron", "Zinc"],
        correctAnswer: "Iron"
    },
    {
        question: "What is a Geiger Counter used to detect?",
        answers: ["Wave", "Step", "Degree", "Radiation"],
        correctAnswer: "Radiation"
    },
    {
        question: "Which type of dog has breeds called Scottish, Welsh and Irish?",
        answers: ["Terrier", "Shepherd", "Boxer", "Retriever"],
        correctAnswer: "Terrier"
    },
    {
        question: "Babe Ruth is associated with which sport?",
        answers: ["Basketball", "Baseball", "Handball", "Volleyball"],
        correctAnswer: "Baseball"
    },
    {
        question: "Who was known as the Maid of Orleans?",
        answers: ["Marie Curie", "Sacagawea", "Joan of Arc", "Isabella I of Castille"],
        correctAnswer: "Joan of Arc"
    }
];

// App state
var wins = 0;
var losses = 0;
var timeUp = 0;
var position = 0;
var timer;
var timeLeft = 10;
var defaultTime = 5000;
var holder;
var currentQuestion = questions[position];

// To start the game
$(document).ready(function () {
    $("#startScreen").show();
    $("#timerLine").hide();
    $("#betweenQuestions").hide();
    $("#content").hide();
    $("#results").hide();
    $("#startGame").on("click", function () {
        $("#timerLine").show();
        clearTimeout(holder);
        timer = setInterval(countDown, 1000);
        reset();
    });
});
displayQuestion();

// Function to display questions and between screens 
function displayBetweenScreens() {
    $("#timerLine").show();
    $("#startScreen").hide();
    $("#betweenQuestions").show();
    $("#content").hide();
    $("#results").hide();
};
function displayQuestion() {
    $("#timerLine").text("Time Remaining: " + timeLeft);
    $("#startScreen").hide();
    $("#betweenQuestions").hide();
    $("#content").show();
    $("#results").hide();
};

// How to change array position for questions
function changeCurrentQuestion() {
    currentQuestion = questions[position];
};

// The reset function
function reset() {
    wins = 0;
    losses = 0;
    timeUp = 0;
    position = 0;
    timeLeft = 10;
    displayQuestion();
    changeCurrentQuestion();
    createQuestion(currentQuestion);
};

// The timer
function countDown() {
    timeLeft--;
    if (timeLeft === -1) {
        clearTimeout(holder);
        holder = setTimeout(timeoutHandler, defaultTime);
        clearInterval(timer);
        displayBetweenScreens();
        $("#yesNo").text("Aowwwwww!! Time is up!!");
        $("#picture").attr("src", "https://media.giphy.com/media/xUySTEJYS5F1Cayg92/giphy.gif");
        $("#whatwasthecorrectanswer").text("The correct answer was: " + currentQuestion.correctAnswer);
        timeLeft = 10;
        timeUp++;
    }
    else {
        $("#timerLine").text("Time Remaining: " + timeLeft);
    }
};

// Score screens or next question
function timeoutHandler() {
    position++;
    if (position === questions.length) {
        $("#correct").text("Correct answers: " + wins);
        $("#uncorrect").text("Uncorrect answers: " + losses);
        $("#unanswered").text("Unanswered: " + timeUp);
        $("#results").show();
        $("#betweenQuestions").hide();
    }
    else {
        timeLeft = 10;
        clearInterval(timer);
        timer = setInterval(countDown, 1000);
        changeCurrentQuestion();
        createQuestion(currentQuestion);
        displayQuestion();
    }
};

// The questions
function createQuestion(questionObj) {
    $("#questionDiv").text(questionObj.question);
    for (var i = 0; i < questionObj.answers.length; i++) {
        $(`#answer${i + 1}Div`).text(questionObj.answers[i]);
    }
};
createQuestion(currentQuestion);

// True vs False answer
$(".answer").on("click", function () {
    var chosenAnswer = $(this).text();
    clearTimeout(holder);
    holder = setTimeout(timeoutHandler, defaultTime);
    clearTimeout(timer);
    if (chosenAnswer === currentQuestion.correctAnswer) {
        displayBetweenScreens();
        $("#yesNo").text("Yes, you're right!");
        $("#picture").attr("src", "https://media.giphy.com/media/xTiTnz33weTH3K8Uvu/giphy.gif");
        $("#whatwasthecorrectanswer").text("You did it right, the correct answer is: " + currentQuestion.correctAnswer);
        wins++;
    }
    else {
        displayBetweenScreens();
        $("#yesNo").text("No, dude! That was a wrong answer!");
        $("#picture").attr("src", "https://media.giphy.com/media/TiZelzuwyyuLm/giphy.gif");
        $("#whatwasthecorrectanswer").text("The correct answer was: " + currentQuestion.correctAnswer);
        losses++;
    }
});

$("#startAgain").on("click", function () {
    clearTimeout(holder);
    timer = setInterval(countDown, 1000);
    reset();
});