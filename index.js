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

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    cancelAnimationFrame(intervalId);

    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const remainingSeconds = Math.max(0, seconds - Math.floor(elapsedTime / 1000));

      timerEl.textContent = formatSeconds(remainingSeconds);

      if (remainingSeconds <= 0) {
        cancelAnimationFrame(intervalId);
        return;
      }

      intervalId = requestAnimationFrame(animate);
    };

    animate();
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  const onlyNumbers = inputEl.value.replace(/\D/g, '');
  inputEl.value = onlyNumbers;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  timerEl.textContent = formatSeconds(seconds);

  animateTimer(seconds);

  inputEl.value = '';
});