import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  messageColor: '#ffffff',
  titleColor: '#ffffff',
  position: 'topRight',
  messageSize: '16px',
  iconColor: '#ffffff',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

const button = document.querySelector('[data-start]');
button.setAttribute('disabled', '');
const input = document.querySelector('#datetime-picker');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = new Date();
    if (selectedDates[0] <= now) {
      iziToast.show({
        backgroundColor: '#ef4040',
        iconUrl: '../img/err.svg',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      button.setAttribute('disabled', '');
    } else {
      userSelectedDate = selectedDates[0];
      button.removeAttribute('disabled');
    }
  },
};

flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}

button.addEventListener('click', () => {
  if (!userSelectedDate) return;

  button.setAttribute('disabled', '');
  input.setAttribute('disabled', '');

  const countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.removeAttribute('disabled');
      return;
    }

    const timerValue = convertMs(diff);
    updateTimer(timerValue);
  }, 1000);
});
