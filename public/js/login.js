$(document).ready(function() {
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  loginForm.on("submit", function(event) {
    event.preventDefault();

    let email = emailInput.val().trim();
    let password = passwordInput.val().trim();

    if(password.indexOf(' ') >= 0){
      handleErr("Error: Password cannot contain any spaces");
      passwordInput.val("");
      return;
    }

    if (password.length < 8) {
      handleErr("Error: Password length is too short and must be at 8 characters long.");
      passwordInput.val("");
      return;
    }

    if (email === "" || password === "") {
      handleErr("Error: Name and Password field cannot be empty.");
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
    }).then(function(data) {
      console.log(data)
      window.location.replace("/");
    }).catch(handleLoginErr);

    // Special error handler specifically for login
    function handleLoginErr() {
      $("#alert .msg").text("Error: Username or Password is incorrect. Please try again.");
      $("#alert").fadeIn(500);
  }
  }
});
