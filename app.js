document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username === 'admin' && password === '12345') {
                window.location.href = 'dashboard.html';
            }
            else {
                alert('Ungültige Anmeldedaten!');
            }
        });
    }
    //LOGOUT
    var logoutDiv = document.getElementById('logoutDiv');
    if (logoutDiv) {
        logoutDiv.addEventListener('click', function () {
            // Hier könnte man auch eine Logout-Logik hinzufügen, z.B. das Löschen von Sessions oder Cookies
            window.location.href = 'login.html';
        });
    }
    else {
        console.error('Logout div nicht gefunden!');
    }
});
function padWithZero(num) {
    return num < 10 ? '0' + num : num.toString();
}
function getCurrentTime() {
    var now = new Date();
    var hours = padWithZero(now.getHours());
    var minutes = padWithZero(now.getMinutes());
    var seconds = padWithZero(now.getSeconds());
    return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
}
var startTime = "07:30"; // Arbeitsbeginn Stempeluhr
function calculateWorkedTime(startTime) {
    var start = startTime.split(":");
    var startHours = parseInt(start[0]);
    var startMinutes = parseInt(start[1]);
    var now = new Date();
    var currentHours = now.getHours();
    var currentMinutes = now.getMinutes();
    var workedHours = currentHours - startHours;
    var workedMinutes = currentMinutes - startMinutes;
    if (workedMinutes < 0) {
        workedMinutes += 60;
        workedHours--;
    }
    return "".concat(padWithZero(workedHours), ":").concat(padWithZero(workedMinutes));
}
var userData = {
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
    var totalHoursElem = document.getElementById('total-hours');
    var weekHoursElem = document.getElementById('week-hours');
    var workedTimeElem = document.getElementById('worked-time');
    totalHoursElem.textContent = "".concat(userData.workingHours, " Stunden");
    weekHoursElem.textContent = "".concat(userData.weekHours, " Stunden");
    //Arbeitszeit anzeigen
    userData.workedTime = calculateWorkedTime(startTime);
    workedTimeElem.textContent = "Geleistete Arbeitszeit: ".concat(userData.workedTime);
    userData.currentTime = getCurrentTime();
    var currentTimeElem = document.getElementById('current-time');
    currentTimeElem.textContent = "Aktuelle Zeit: ".concat(userData.currentTime);
    // Termine anzeigen
    var appointmentsList = document.getElementById('appointments');
    appointmentsList.innerHTML = '';
    userData.appointments.forEach(function (appointment) {
        var li = document.createElement('li');
        li.textContent = appointment;
        appointmentsList.appendChild(li);
    });
    // To-Do Liste anzeigen
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    userData.todos.forEach(function (todo) {
        var li = document.createElement('li');
        li.textContent = todo;
        todoList.appendChild(li);
    });
}
updateDashboard();
setInterval(updateDashboard, 1000);
