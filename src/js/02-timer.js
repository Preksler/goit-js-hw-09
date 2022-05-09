import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    inputEl: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener("click", startTimer);

function startTimer() {
    const date = new Date(refs.inputEl.value);
    const timerId = setInterval(() => {
        const now = new Date();
        const timeLeft = date - now;
        if(timeLeft > 0) {
            const time = convertMs(timeLeft);
            updateClockface(time);
        } else {
            clearInterval(timerId);
            refs.startBtn.disabled = false;
        };
    }, 1000);
    refs.startBtn.disabled = true;
};

function updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

function errorMessage() {
    Notify.failure('Please choose a date in the future');
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        let currentDate = options.defaultDate.getTime();
        if (selectedDates[0] < currentDate) {
            refs.startBtn.disabled = true;
            errorMessage();
            return;
        } else {
            refs.startBtn.disabled = false;
        };
    },
};

flatpickr(refs.inputEl, options);