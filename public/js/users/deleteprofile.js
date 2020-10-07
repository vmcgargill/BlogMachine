$(document).ready(function () {
  // Special Handle Delete Error created so that error does not prompt when the user enters their password correctly.
  // If we user the handleErr function in error.js here it would prompt the error no matter what, even if the user entered the correct password.
  // By creating a unique error inside the document ready block, we prevent this problem.
  function handleDeleteErr() {
    $("#alert .msg").text("Password is incorrect. Please try again.");
    $("#alert").fadeIn(500);
  }

  // Gets the current user email for authincation with the password
  let email = document.getElementById("user-email").getAttribute("value");

  // Delete Profile Button Event click Listener
  $("#delete-profile").on("click", function (event) {
    event.preventDefault();
    let password = $("#password-input").val();
    $("#password-input").val("");
    if (password.trim() === "") {
      handleErr("Please enter a password to delete your account.");
    } else {
      $.ajax({
        method: "DELETE",
        url: "/api/deleteProfile",
        data: {
          password: password,
          email: email
        }
      }).then(function (data) {
        if (data.success) {
          window.location.href = "/logout";
        }
      }).catch(handleDeleteErr);
    }
  });

});

