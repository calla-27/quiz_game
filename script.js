const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultScreen  = document.getElementById('result-screen');

const startBtn      = document.getElementById('start-btn');
const restartBtn    = document.getElementById('restart-btn');

const questionText  = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');

const currentSpan   = document.getElementById('current-question');
const totalSpan     = document.getElementById('total-questions');
const scoreSpan     = document.getElementById('score');

const finalScoreSpan= document.getElementById('final-score');
const maxScoreSpan  = document.getElementById('max-score');
const resultMsg     = document.getElementById('result-message');

const progressBar   = document.getElementById('progress');

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London",  correct: false },
      { text: "Berlin",  correct: false },
      { text: "Paris",   correct: true  },
      { text: "Madrid",  correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus",   correct: false },
      { text: "Mars",    correct: true  },
      { text: "Jupiter", correct: false },
      { text: "Saturn",  correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic", correct: false },
      { text: "Indian",   correct: false },
      { text: "Arctic",   correct: false },
      { text: "Pacific",  correct: true  }
    ]
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java",     correct: false },
      { text: "Python",   correct: false },
      { text: "Banana",   correct: true  },
      { text: "JavaScript",correct:false}
    ]
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go",  correct: false },
      { text: "Gd",  correct: false },
      { text: "Au",  correct: true  },
      { text: "Ag",  correct: false }
    ]
  }
];

let currentIndex = 0;
let score        = 0;
let lockAnswer   = false;

totalSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', () => {
  resultScreen.classList.remove('active');
  startQuiz();
});

function startQuiz() {
  currentIndex = 0;
  score        = 0;
  scoreSpan.textContent = 0;
  lockAnswer   = false;

  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  progressBar.style.width = '0%';

  showQuestion();
}

function showQuestion() {
  lockAnswer = false;
  const q = quizQuestions[currentIndex];

  currentSpan.textContent = currentIndex + 1;
  questionText.textContent = q.question;

  const percent = (currentIndex / quizQuestions.length) * 100;
  progressBar.style.width = percent + '%';

  answersContainer.innerHTML = '';

  q.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = ans.text;
    btn.dataset.correct = ans.correct;
    btn.addEventListener('click', selectAnswer);
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(e) {
  if (lockAnswer) return;
  lockAnswer = true;

  const selectedBtn = e.target;
  const isCorrect   = selectedBtn.dataset.correct === 'true';

  Array.from(answersContainer.children).forEach(btn => {
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    } else if (btn === selectedBtn) {
      btn.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  finalScoreSpan.textContent = score;

  let msg = '';
  if (score === 5) {
    msg = 'Good job!';
  } else if (score >= 3 && score <= 4) {
    msg = 'Keep studying! You\'ll get better!';
  } else {
    msg = 'Not bad! Try again to improve!';
  }
  resultMsg.textContent = msg;
}