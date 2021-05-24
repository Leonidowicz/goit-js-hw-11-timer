class CountdownTimer {
  constructor(obj) {
    this.selector = obj.selector;
    this.targetDate = obj.targetDate;
    this.intervalId = null;
  }
  getRefs() {
    return {
      days: document.querySelector(`${this.selector} [data-value="days"]`),
      hours: document.querySelector(`${this.selector} [data-value="hours"]`),
      mins: document.querySelector(`${this.selector} [data-value="mins"]`),
      secs: document.querySelector(`${this.selector} [data-value="secs"]`),
    };
  }
  updateDate() {
    this.intervalId = setInterval(() => {
      const time = this.targetDate - Date.now();
      if (time < 0) {
        clearInterval(this.intervalId);
        return;
      }
      this.getRefs().days.textContent = Math.floor(
        time / (1000 * 60 * 60 * 24)
      );
      this.getRefs().hours.textContent = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.getRefs().mins.textContent = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.getRefs().secs.textContent = Math.floor((time % (1000 * 60)) / 1000);
    }, 1000);
  }
}

/* Попытка сделать изменяемый таймер - неудачно */
function setTime() {
  const ref = {
    input: document.querySelector('input'),
    span: document.querySelector('.span'),
  };
  ref.input.valueAsNumber = 25000000;

  let plusTime = ref.input.valueAsNumber;
  let newTime = new Date(Date.now() + plusTime);
  let mils = 0;
  ref.span.textContent = `Timer time: ${newTime} (mils:${mils})`;
  ref.input.addEventListener('change', (a) => {
    mils = a.target.valueAsNumber;
    console.log(`mils: ${a.target.valueAsNumber}`);
  });

  return newTime;
}
console.log(setTime());

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(`${setTime()}`),
}).updateDate();
