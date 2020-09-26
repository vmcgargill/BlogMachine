$(document).ready(function() {
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  loginForm.on("submit", function(event) {
    event.preventDefault();

    let email = emailInput.val().trim();
    let password = passwordInput.val().trim();

    if(password.indexOf(' ') >= 0){
      $("#alert .msg").text("Error: Password cannot contain any spaces");
      $("#alert").fadeIn(500);
      passwordInput.val("");
      return;
    }

    if (password.length > 8) {
      $("#alert .msg").text("Error: Password length is too short and must be at 8 characters long.");
      $("#alert").fadeIn(500);
      passwordInput.val("");
      return;
    }

    if (email === "" || password === "") {
      $("#alert .msg").text("Error: Name, Email, and Password field cannot be empty.");
      $("#alert").fadeIn(500);
      passwordInput.val("");
      return;
    }

    loginUser(email, password);
    emailInput.val("");
    passwordInput.val("");
  });

  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function() {
      window.location.replace("/");
    }).catch(handleLoginErr);
  }

  function handleLoginErr() {
    $("#alert .msg").text("Error: Username or Password is incorrect. Please try again.");
    $("#alert").fadeIn(500);
  }
});
