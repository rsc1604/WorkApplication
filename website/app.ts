document.addEventListener('DOMContentLoaded', () => {   //LOGIN
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;

      if (username === 'admin' && password === '12345') {
        window.location.href = 'dashboard.html'; 
      } else {
        alert('Ungültige Anmeldedaten!');
      }
    });
  }

//LOGOUT
  const logoutDiv = document.getElementById('logoutDiv');
  if (logoutDiv) {
    logoutDiv.addEventListener('click', function () {
      // Hier könnte man auch eine Logout-Logik hinzufügen, z.B. das Löschen von Sessions oder Cookies
      window.location.href = 'login.html'; 
    });
  } else {
    console.error('Logout div nicht gefunden!');
  }

  const dateDiv = document.getElementById('dateDive');
  if (dateDiv) {
    dateDiv.addEventListener('click', function(){
      window.location.href = 'https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=167&ct=1733815242&rver=7.5.2211.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26culture%3den-us%26country%3dus%26RpsCsrfState%3da1353540-ceb9-b5b2-f6fb-437f2b14a1de&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c';
    });
  }
  else {
    console.error('Date Div nicht gefunden!');
  }
  
});

function padWithZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}

function getCurrentTime(): string {
  const now = new Date();
  const hours = padWithZero(now.getHours());  
  const minutes = padWithZero(now.getMinutes());  
  const seconds = padWithZero(now.getSeconds());  
  return `${hours}:${minutes}:${seconds}`;
}

let startTime = "07:30"; // Arbeitsbeginn Stempeluhr

function calculateWorkedTime(startTime: string): string {
  const start = startTime.split(":");
  const startHours = parseInt(start[0]);
  const startMinutes = parseInt(start[1]);

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  let workedHours = currentHours - startHours;
  let workedMinutes = currentMinutes - startMinutes;

  if (workedMinutes < 0) {
    workedMinutes += 60;
    workedHours--;
  }

  return `${padWithZero(workedHours)}:${padWithZero(workedMinutes)}`;
}

interface UserData {
  workingHours: number;
  weekHours: number;
  appointments: string[];
  todos: string[];
  currentTime: string;
  workedTime: string;
}

const userData: UserData = {
  workingHours: 35,
  weekHours: 7,
  appointments: [
    '13:00 - Meeting mit dem Team',
    '15:00 - Projektbesprechung'
  ],
  todos: [
    'Projektbericht abschließen',
    'Kundenanfrage beantworten',
    'Website aktualisieren'
  ],
  currentTime: getCurrentTime(),
  workedTime: calculateWorkedTime(startTime),  
};





function updateDashboard() {
  const totalHoursElem = document.getElementById('total-hours') as HTMLElement;
  const weekHoursElem = document.getElementById('week-hours') as HTMLElement;
  const workedTimeElem = document.getElementById('worked-time') as HTMLElement;
  totalHoursElem.textContent = `${userData.workingHours} Stunden`;
  weekHoursElem.textContent = `${userData.weekHours} Stunden`;

  //Arbeitszeit anzeigen
  userData.workedTime = calculateWorkedTime(startTime);  
  workedTimeElem.textContent = `Geleistete Arbeitszeit: ${userData.workedTime}`;

  userData.currentTime = getCurrentTime();
  const currentTimeElem = document.getElementById('current-time') as HTMLElement;
  currentTimeElem.textContent = `Aktuelle Zeit: ${userData.currentTime}`;
  // Termine anzeigen
  const appointmentsList = document.getElementById('appointments') as HTMLElement;
  appointmentsList.innerHTML = ''; 
  userData.appointments.forEach(appointment => {
    const li = document.createElement('li');
    li.textContent = appointment;
    appointmentsList.appendChild(li);
  });

  // To-Do Liste anzeigen
  const todoList = document.getElementById('todo-list') as HTMLElement;
  todoList.innerHTML = ''; 
  userData.todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo;
    todoList.appendChild(li);
  });
}

updateDashboard();

setInterval(updateDashboard, 1000);


