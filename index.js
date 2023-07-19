const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

function formatSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsTimer = seconds % 60;

  return `${formatTwoNumbers(hours)}:${formatTwoNumbers(minutes)}:${formatTwoNumbers(secondsTimer)}`;
}
function formatTwoNumbers(val) {
  return String(val).padStart(2, '0');
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let intervalId;
  return (seconds) => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      seconds--;
      timerEl.textContent = formatSeconds(seconds);
      if (seconds <= 0) {
        clearInterval(intervalId);
        return
      }
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const onlyNumbers = inputEl.value.replace(/\D/g, '');
  inputEl.value = onlyNumbers;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  
  timerEl.textContent = formatSeconds(seconds);
  
  animateTimer(seconds);

  inputEl.value = '';
});
