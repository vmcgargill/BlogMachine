// Handle Error function that is used on many other files in the public layer. It's a generic handle error function.
// Delete profile and login have their own functions because if this is used outside the document ready blocks it will display an error even though there is no error.
// In eslintrc.json we must disable the no-unused-vars error for this to work and no eslint errors to display.
function handleErr(err) {
  $("#alert").fadeIn(500);
  $("#alert .msg").text(err);
}