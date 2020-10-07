$(document).ready(function () {
  // Checks if user has posted any blogs yet
  if ($("#UserBlogs").text().trim() === "") {
    $("#UserBlogs").text("No blogs have been posted yet");
  }
});