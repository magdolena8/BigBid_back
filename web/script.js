// Функция для показа страницы и скрытия всех остальных страниц
function showPage(pageName) {
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].id === pageName) {
      pages[i].style.display = "block";
    } else {
      pages[i].style.display = "none";
    }
  }
}

// Показываем страницу "Home" по умолчанию
showPage("home");

// Функция для отправки формы логина
function submitLogin(event) {
  event.preventDefault();

  var loginType = document.getElementById("loginType").value;
  var login = document.getElementById("login").value;
  var password = document.getElementById("password").value;

  // Делаем что-то с введенными данными, например, отправляем на сервер для проверки
  console.log(loginType, login, password);
}

// Находим форму логина и добавляем для нее обработчик отправки
var loginForm = document.querySelector("form");
loginForm.addEventListener("submit", submitLogin);

// Отправляем данные на сервер 
var xhr = new XMLHttpRequest();
var url = "http://localhost:3000/api/login"; 
xhr.open("POST", url, true); xhr.setRequestHeader("Content-Type", "application/json"); xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { var response = JSON.parse(xhr.responseText); console.log(response);
 // В этом месте можно делать что-то с ответом от сервера, например, редирект на другую страницу
 } }; var data = JSON.stringify({ loginType: loginType, login: login, password: password }); xhr.send(data); }

