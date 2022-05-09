const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;
let isActive = false;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', changeColor);
refs.stopBtn.addEventListener('click', stopColor);

function changeColor() {
    isActive = true;
    if (isActive) {
        refs.startBtn.disabled = true;
        refs.stopBtn.disabled = false;
    };
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopColor() {
    clearInterval(timerId);
    isActive = false;
    if (!isActive) {
        refs.startBtn.disabled = false;
        refs.stopBtn.disabled = true;
    }   
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};