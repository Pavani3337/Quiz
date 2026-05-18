
// 🔥 AUTO GENERATOR (100 QUESTIONS PER SUBJECT)
function generateQuestions(subject) {
    let arr = [];

    for (let i = 1; i <= 100; i++) {
        arr.push({
            q: `${subject.toUpperCase()} Question ${i}`,
            options: ["A", "B", "C", "D"],
            ans: "A"
        });
    }

    return arr;
}

// 📚 5 Subjects (100 each)
let questionBank = {
    math: generateQuestions("math"),
    science: generateQuestions("science"),
    english: generateQuestions("english"),
    history: generateQuestions("history"),
    computer: generateQuestions("computer")
};

let questions = [];
let index = 0;
let score = 0;
let correct = 0;
let wrong = 0;
let timer;
let timeLeft = 30;

// 🚀 Start Quiz
function startQuiz() {
    let subject = document.getElementById("subject").value;
    let count = parseInt(document.getElementById("qCount").value);

    if (isNaN(count) || count < 1 || count > 100) {
        alert("Enter between 1 to 100 questions");
        return;
    }

    questions = questionBank[subject].slice(0, count);

    document.getElementById("setup").style.display = "none";
    document.getElementById("quizBox").style.display = "block";

    loadQuestion();
}

// 📌 Load Question
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

// ⏱ Timer
function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").innerText = timeLeft;

    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// ✅ Answer Check
function checkAnswer(selected) {
    if (selected === "A") {
        score++;
        correct++;
    } else {
        wrong++;
    }

    nextQuestion();
}

// ⏭ Next
function nextQuestion() {
    index++;
    loadQuestion();
}

// 📊 Result Chart
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
}