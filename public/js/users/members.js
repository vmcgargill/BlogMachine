$(document).ready(function () {
  // If no members are registred to website then display this message
  if ($("#memberRow").html().trim() === "") {
    $("#NoNembers").text("It looks like no members have joined yet. Click on Create Account to create and account.");
  }
});