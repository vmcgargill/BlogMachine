$(document).ready(function(){
  // API call that sees if user is signed in or not.
  $.get("/api/user_data").then(function(data) {
    if (data === null) {
      // If user is not signed in they will see sign up and login buttons on nav.
      document.getElementById("Login").classList.remove("hidden");
      document.getElementById("Signup").classList.remove("hidden");
    } else {
      // If user is signed in, they will see the logged in menu.
      document.getElementById("LoggedInMenu").classList.remove("hidden");
    }
  });

  // Loads blog search suggestions so when user searches for blogs, they will get dropdown list of blog titles.
  $.get("/api/blogSearchSuggestions").then(function(data) {
    $("#SearchBlogInput").autocomplete({
      source: data
    });
  });

  // Search blog button event click listener that will search for blogs with title or mood
  $("#SearchBlogBtn").on("click", function() {
    let SearchBlogInput = $("#SearchBlogInput").val().trim();
    if (SearchBlogInput === "") {
      $("#searchAlert").fadeIn(500);
      $("#searchAlert .msg").text("Error: Search field is empty");
    } else {
      window.location.href = "/blogSearch/" + SearchBlogInput;
    }
  });
});