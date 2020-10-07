$(document).ready(function () {
  var loginForm = $("form.login");
  // Special Handle Login Error created so that error does not prompt when the user logs in succesfully.
  // If we user the handleErr function in error.js here it would prompt the error no matter what, even if the user logs in succesfully.
  // By creating a unique error inside the document ready block, we prevent this problem.
  function handleLoginErr() {
    $("#alert .msg").text("Error: Username or Password is incorrect. Please try again.");
    $("#alert").fadeIn(500);
  }
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // On submit form event listener that logs in user
  loginForm.on("submit", function (event) {
    event.preventDefault();

    let email = emailInput.val().trim();
    let password = passwordInput.val().trim();

    if (password.indexOf(" ") >= 0) {
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

    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function () {
        window.location.replace("/");
      }).catch(handleLoginErr);
    }

    loginUser(email, password);
    emailInput.val("");
    passwordInput.val("");
  });

});
