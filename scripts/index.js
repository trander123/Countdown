//default
const given = 14;

// milliseconds formulas
const dayFormula = 24 * 60 * 60 * 1000;
const hourFormula = 60 * 60 * 1000;
const minFormula = 60 * 1000;
const secFormula = 1000;

let timer = given * dayFormula;

//convert milliseconds to days
const getDays = (x) => {
  return Math.floor(x / dayFormula);
};
//convert milliseconds to hours
const getHours = (x) => {
  const hours = x - getDays(x) * dayFormula;
  return Math.floor(hours / hourFormula);
};
//convert milliseconds to minutes
const getMins = (x) => {
  const mins = x - (getDays(x) * dayFormula + getHours(x) * hourFormula);
  return Math.floor(mins / minFormula);
};
//convert milliseconds to seconds
const getSecs = (x) => {
  const secs =
    x -
    (getDays(x) * dayFormula +
      getHours(x) * hourFormula +
      getMins(x) * minFormula);
  return Math.floor(secs / secFormula);
};

const daysHTML = document.getElementById("days");
const hoursHTML = document.getElementById("hours");
const minutesHTML = document.getElementById("minutes");
const secondsHTML = document.getElementById("seconds");

const rotate = (id) => {
  document.getElementById(id).style.transform = "rotateX(90deg)";
};

const rotateDefault = (id) => {
  document.getElementById(id).style.transform = "rotateX(360deg)";
};

let second = 0;

const interval = setInterval(() => {
  let day = getDays(timer);
  let hour = getHours(timer);
  let min = getMins(timer);
  let sec = getSecs(timer);

  day >= 10 ? day : (day = `0${day}`);
  hour >= 10 ? hour : (hour = `0${hour}`);
  min >= 10 ? min : (min = `0${min}`);
  sec >= 10 ? sec : (sec = `0${sec}`);

  daysHTML.innerHTML = day;
  hoursHTML.innerHTML = hour;
  minutesHTML.innerHTML = min;
  secondsHTML.innerHTML = sec;

  rotate("seconds-card");
  const delay = setTimeout(() => {
    rotateDefault("seconds-card");
  }, 200);

  //minutes
  if (second % 60 == 0) {
    rotate("minutes-card");
    const delay = setTimeout(() => {
      rotateDefault("minutes-card");
    }, 200);
    if (timer <= 0) {
      clearTimeout(delay);
    }
  }
  //hours
  if (second % (60 * 60) == 0) {
    rotate("hours-card");
    const delay = setTimeout(() => {
      rotateDefault("hours-card");
    }, 200);
    if (timer <= 0) {
      clearTimeout(delay);
    }
  }
  //days
  if (second % (60 * 60 * 24) == 0) {
    rotate("days-card");
    const delay = setTimeout(() => {
      rotateDefault("days-card");
    }, 200);
    if (timer <= 0) {
      clearTimeout(delay);
    }
  }

  second++;
  timer -= 1000;
  if (timer <= 0) {
    clearInterval(interval);
    clearTimeout(delay);
  }
}, 1000);
