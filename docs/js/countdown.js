// установить количество дней, которые у пользователя будут отсчитываться
setTimeToDeadline(15)

function getTimeRemaining(endtime) {
    const total = endtime - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

function setTimeToDeadline(days) {
    let deadline
    try {
        const oldDeadline = JSON.parse(localStorage.getItem('countdown'))
        if (oldDeadline && oldDeadline > Date.now()) {
            deadline = oldDeadline
        } else {
            deadline = Date.now() + days * 24 * 60 * 60 * 1000;
            localStorage.setItem('countdown', JSON.stringify(deadline))
        }
    } catch(e) {
        console.log(e)
        deadline = Date.now() + days * 24 * 60 * 60 * 1000;
    }

    initializeClock('clockdiv', deadline);
}