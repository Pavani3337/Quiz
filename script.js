let questionBank = {
    math: [
        { q: "12 × 8 = ?", options: ["96", "88", "108", "84"], ans: "96" },
        { q: "Square root of 144?", options: ["10", "11", "12", "14"], ans: "12" },
        { q: "15 + 27 = ?", options: ["42", "43", "41", "44"], ans: "42" },
        { q: "π value approx?", options: ["3.14", "2.14", "4.13", "3.41"], ans: "3.14" },
        { q: "50 ÷ 5 = ?", options: ["10", "5", "15", "20"], ans: "10" }
    ],

    science: [
        { q: "Water formula?", options: ["H2O", "CO2", "O2", "NaCl"], ans: "H2O" },
        { q: "Sun is a?", options: ["Planet", "Star", "Moon", "Asteroid"], ans: "Star" },
        { q: "Breathing gas?", options: ["O2", "CO2", "H2", "N2"], ans: "O2" },
        { q: "Boiling point?", options: ["100°C", "90°C", "50°C", "120°C"], ans: "100°C" },
        { q: "Plants make food by?", options: ["Photosynthesis", "Respiration", "Digestion", "Absorption"], ans: "Photosynthesis" }
    ],

    english: [
        { q: "Opposite of Happy?", options: ["Sad", "Joyful", "Bright", "Glad"], ans: "Sad" },
        { q: "Past tense of Go?", options: ["Went", "Gone", "Going", "Go"], ans: "Went" },
        { q: "Synonym of Fast?", options: ["Quick", "Slow", "Late", "Weak"], ans: "Quick" },
        { q: "Plural of Child?", options: ["Children", "Childs", "Childes", "Childer"], ans: "Children" },
        { q: "Article before vowel?", options: ["a", "an", "the", "none"], ans: "an" }
    ],

    history: [
        { q: "First PM of India?", options: ["Nehru", "Gandhi", "Patel", "Bose"], ans: "Nehru" },
        { q: "Taj Mahal built by?", options: ["Akbar", "Shah Jahan", "Babur", "Aurangzeb"], ans: "Shah Jahan" },
        { q: "Independence year?", options: ["1947", "1950", "1935", "1945"], ans: "1947" },
        { q: "Father of Nation?", options: ["Gandhi", "Nehru", "Patel", "Tilak"], ans: "Gandhi" },
        { q: "British rule duration?", options: ["200 yrs", "100 yrs", "150 yrs", "300 yrs"], ans: "200 yrs" }
    ],

    computer: [
        { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text", "None", "Tool Language"], ans: "Hyper Text Markup Language" },
        { q: "CPU is?", options: ["Brain", "Screen", "Mouse", "Printer"], ans: "Brain" },
        { q: "RAM is?", options: ["Memory", "Storage", "Software", "Virus"], ans: "Memory" },
        { q: "Binary digits?", options: ["0 and 1", "1 and 2", "A and B", "X and Y"], ans: "0 and 1" },
        { q: "Internet is?", options: ["Network", "Game", "Software", "Device"], ans: "Network" }
    ]
};

let questions = [];
let index = 0;
let score = 0;
let correct = 0;
let wrong = 0;
let timer;
let timeLeft = 30;
let userAnswers = [];

// START QUIZ
function startQuiz() {

    let subject = document.getElementById("subject").value;
    let count = parseInt(document.getElementById("qCount").value);

    questions = questionBank[subject].slice(0, count);

    index = 0;
    score = 0;
    correct = 0;
    wrong = 0;
    userAnswers = [];

    document.getElementById("setup").style.display = "none";
    document.getElementById("quizBox").style.display = "block";

    loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {

    if (index >= questions.length) {
        showResult();
        return;
    }

    let q = questions[index];

    document.getElementById("question").innerText = q.q;

    let optBox = document.getElementById("options");
    optBox.innerHTML = "";

    q.options.forEach(opt => {

        let div = document.createElement("div");
        div.classList.add("option");
        div.innerText = opt;

        div.onclick = () => checkAnswer(opt);

        optBox.appendChild(div);
    });

    startTimer();
}

// TIMER
function startTimer() {

    timeLeft = 30;
    document.getElementById("timer").innerText = timeLeft;

    clearInterval(timer);

    timer = setInterval(() => {

        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion(null);
        }

    }, 1000);
}

// CHECK ANSWER
function checkAnswer(selected) {

    let correctAns = questions[index].ans;

    userAnswers.push({
        question: questions[index].q,
        selected: selected || "Not Answered",
        correct: correctAns
    });

    if (selected === correctAns) {
        score++;
        correct++;
    } else {
        wrong++;
    }

    nextQuestion();
}

// NEXT QUESTION
function nextQuestion() {
    index++;
    loadQuestion();
}

// RESULT
function showResult() {

    document.getElementById("quizBox").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("scoreText").innerText =
        `Score: ${score} / ${questions.length}`;

    new Chart(document.getElementById("chart"), {
        type: "pie",
        data: {
            labels: ["Correct", "Wrong"],
            datasets: [{
                data: [correct, wrong],
                backgroundColor: ["green", "red"]
            }]
        }
    });

    let reviewBox = document.getElementById("review");
    reviewBox.innerHTML = "";

    userAnswers.forEach((item, i) => {

        let div = document.createElement("div");

        div.style.background = item.selected === item.correct ? "#2ecc71" : "#e74c3c";

        div.innerHTML = `
            <b>Q${i + 1}:</b> ${item.question}<br>
            <b>Your Answer:</b> ${item.selected}<br>
            <b>Correct Answer:</b> ${item.correct}
        `;

        reviewBox.appendChild(div);
    });
}