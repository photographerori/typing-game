const words = [
  'apple',
  'sky',
  'blue',
  'middle',
  'set',
  'hello',
  'color',
  'light',
  'coffee',
  'chocolate',
  'orange',
  'guitar',
  'happy',
  'programming',
  'world'
];

let word;
let loc;
let score;
let miss;
const timeLimit = 30 * 1000;
let startTime;
let isPlaying = false;

const target = document.getElementById('target');
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const timerLabel = document.getElementById('timer');

function updateTarget() {
  let placeholder = '';
  for (let i = 0; i < loc; i++) {
    placeholder += '_';
  }
  target.textContent = placeholder + word.substring(loc);
}

function updateTimer() {
  const timeLeft = startTime + timeLimit - Date.now();
  timerLabel.textContent = (timeLeft/1000).toFixed(2);

  const timeoutId = setTimeout(() => {
    updateTimer();
  }, 10);

  if (timeLeft < 0) {
    isPlaying = false;

    clearTimeout(timeoutId);
    timerLabel.textContent = '0.00';
    setTimeout(() => {
      showResult();
    }, 100);

    target.textContent = 'click to replay';
  }
}

function showResult() {
  const accurancy = score + miss === 0 ? 0 : score / (score + miss) * 100;
  alert(`${score} letters, ${miss} misses, ${accurancy.toFixed(2)}% accuracncy!`)
}

window.addEventListener('click', () => {
  if (isPlaying === true) {
    return;
  }
  isPlaying = true;

  loc = 0;
  score = 0;
  miss = 0;
  scoreLabel.textContent = score;
  missLabel.textContent = miss;
  word = words[Math.floor(Math.random() * words.length)];

  target.textContent = word;
  startTime = Date.now();
  updateTimer();
})

window.addEventListener('keydown', (e) => {
  if (isPlaying !== true) {
    return;
  }

  console.log(e.key);
  if (e.key === word[loc]) {
    console.log('score');
    loc++;
    if (loc === word.length) {
      word = words[Math.floor(Math.random() * words.length)];
      loc = 0;
    }
    updateTarget();
    score++;
    scoreLabel.textContent = score;
  } else {
    console.log('miss');
    miss++;
    missLabel.textContent = miss;
  }
});
