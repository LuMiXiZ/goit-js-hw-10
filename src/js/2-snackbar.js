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

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayValue = Number(form.elements.delay.value);
  const stateValue = form.elements.state.value;

  if (delayValue < 0) {
    iziToast.show({
      backgroundColor: '#ef4040',
      iconUrl: './img/err.svg',
      title: 'Error',
      message: 'Invalid value',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise
    .then(delayValue => {
      iziToast.show({
        backgroundColor: '#59a10d',
        iconUrl: './img/ok.svg',
        title: 'Ok',
        message: `Fulfilled promise in ${delayValue}ms`,
      });
    })
    .catch(delayValue => {
      iziToast.show({
        backgroundColor: '#ef4040',
        iconUrl: './img/err.svg',
        title: 'Error',
        message: `Rejected promise in ${delayValue}ms`,
      });
    });

  form.reset();
});
