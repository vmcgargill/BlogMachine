$(document).ready(function () {

  // Checks if user has posted any blogs yet
  if ($("#UserBlogs").text().trim() === "") {
    $("#UserBlogs").text("No blogs have been posted yet");
  }

  // Edit profile event click listener
  $("#edit-profile").on("click", function () {
    window.location.href = "/editprofile";
  });

  // Delete profile event click listener
  $("#delete-profile").on("click", function () {
    window.location.href = "/deleteProfile";
  });
});
