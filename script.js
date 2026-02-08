const currentTimeEl = document.getElementById("currentTime");
const addAlarmBtn = document.getElementById("addAlarmBtn");
const alarmsContainer = document.getElementById("alarms");
const alarmSound = document.getElementById("alarmSound");

let alarms = [];

function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  currentTimeEl.innerText = `${h}:${m}:${s}`;

  checkAlarms(h, m, s);
}

setInterval(updateTime, 1000);
updateTime();

addAlarmBtn.addEventListener("click", () => {
  const hour = document.getElementById("hour").value.padStart(2, "0");
  const minute = document.getElementById("minute").value.padStart(2, "0");

  if (hour === "" || minute === "") return;

  const alarm = {
    time: `${hour}:${minute}`,
    active: true,
    triggered: false
  };

  alarms.push(alarm);
  renderAlarms();
});

function renderAlarms() {
  alarmsContainer.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const div = document.createElement("div");
    div.className = "alarm-item";

    div.innerHTML = `
      <span>${alarm.time}</span>
      <div style="display:flex;align-items:center;">
        <div class="toggle ${alarm.active ? "active" : ""}" onclick="toggleAlarm(${index})"></div>
        <span class="delete" onclick="deleteAlarm(${index})">🗑️</span>
      </div>
    `;

    alarmsContainer.appendChild(div);
  });
}

function toggleAlarm(index) {
  alarms[index].active = !alarms[index].active;
  renderAlarms();
}

function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

function checkAlarms(h, m, s) {
  alarms.forEach((alarm) => {
    if (alarm.active && !alarm.triggered && alarm.time === `${h}:${m}` && s === "00") {
      alarmSound.play();
      alarm.triggered = true;
      setTimeout(() => (alarm.triggered = false), 60000); 
    }
  });
}
