function rotateClockHands(timeZone, clockId) {
    
    const date = new Date().toLocaleString('en-US', {
        timeZone: timeZone,
        hour12:false //24 hr format
    });
//   console.log(date)
    const timeParts = date.split(', ')[1].split(':');

    const hourHand = document.querySelector(`#${clockId} .hourHand`);
    const minuteHand = document.querySelector(`#${clockId} .minuteHand`);
    const secondHand = document.querySelector(`#${clockId} .secondHand`);

    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);
    //digital time clock
    const time = document.querySelector(`#${clockId} .time`);
     let timeString="";
     timeString = `${hours}:${minutes}:${seconds}`;
    time.textContent=timeString;
//analog clock
    const hourAngle = (hours % 12 + minutes / 60) * 30;
    const minuteAngle = (minutes + seconds / 60) * 6;
    const secondAngle = seconds * 6;

    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
}
const clockIntervals = new Map();
function displayTime(clockId) {
    const timeZone = document.getElementById(clockId).getAttribute('data-timezone');
  rotateClockHands(timeZone, clockId);
  const time = document.querySelector(`#${clockId} .time`);
  //show Digital Time heading first 
  let timeString="";
   time.textContent="Digital Time";
    // Updating the clock every second using setInterval and store the interval ID
  const intervalId = setInterval(() => rotateClockHands(timeZone, clockId), 1000);
  clockIntervals.set(clockId, intervalId);
}

// updating all clocks
const clockCards = document.querySelectorAll('.clock');
clockCards.forEach(clockCard => {
    const clockId = clockCard.id;
    displayTime(clockId);
});
