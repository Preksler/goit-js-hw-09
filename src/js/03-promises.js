import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const data = {
    amount: Number(refs.inputAmount.value),
    delay: Number(refs.inputDelay.value),
    step: Number(refs.inputStep.value),
  }
  callCreatePromises(data);
};

function callCreatePromises({ amount, delay, step }) {
  let delayCounter = delay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delayCounter)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayCounter += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  } 
  );
}
