const clockElement = document.getElementById('clock');
const alarmForm = document.getElementById('alarm-form');
const alarmsList = document.getElementById('alarms-list');
const alarmSound = document.getElementById('alarm-sound');

let alarms = [];

function renderClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    const period = now.getHours() >= 12 ? 'PM' : 'AM';
    clockElement.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}

function renderAlarm(alarm) {
    const li = document.createElement('li');
    li.textContent = `${alarm.hour}:${alarm.minute < 10 ? '0' : ''}${alarm.minute} ${alarm.period}`;
    alarmsList.appendChild(li);
}

function addAlarm(event) {
    event.preventDefault();
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const period = document.getElementById('period').value;

    if (!isNaN(hours) && !isNaN(minutes)) {
        const newAlarm = { hour: hours, minute: minutes, period: period };
        alarms.push(newAlarm);
        renderAlarm(newAlarm);
    }

    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
}

function checkAlarms() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (const alarm of alarms) {
        if (
            alarm.hour === (currentHour % 12 || 12) &&
            alarm.minute === currentMinute &&
            alarm.period === (currentHour >= 12 ? 'pm' : 'am')
        ) {
            alarmSound.play();
            break;
        }
    }
}

renderClock();
setInterval(renderClock, 1000);
alarmForm.addEventListener('submit', addAlarm);
setInterval(checkAlarms, 1000); 
