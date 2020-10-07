$(document).ready(function() {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const nameInput = $("input#name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // On Submit Click Event Listener
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    let name = nameInput.val().trim();
    let email = emailInput.val().trim();
    let password = passwordInput.val().trim();

    if(password.indexOf(" ") >= 0){
      $("#alert .msg").text("Error: Password cannot contain any spaces");
      $("#alert").fadeIn(500);
      passwordInput.val("");
      return;
    }

    if (password.length < 8) {
      $("#alert .msg").text("Error: Password length is too short and must be at 8 characters long.");
      $("#alert").fadeIn(500);
      passwordInput.val("");
      return;
    }

    if (name === "" || email === "" || password === "") {
      $("#alert .msg").text("Error: Name, Email, and Password field cannot be empty.");
      $("#alert").fadeIn(500);
      passwordInput.val("");
      return;
    }

    function signUpUser(name, email, password) {
      $.post("/api/signup", {
        name: name,
        email: email,
        password: password
      }).then(function(data) {
        if (data.error) {
          $("#alert .msg").text(data.error);
          $("#alert").fadeIn(500);
        } else {
          window.location.replace("/");
        }
      }).catch(handleErr);
    }

    signUpUser(name, email, password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

});
