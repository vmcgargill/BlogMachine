$(document).ready(function () {
  const RecentBlogs = $("#RecentBlogs");

  // Gets the 5 most recenlty posted blogs and displays them on home screen
  $.get("/api/blogs/?order=DESC&limit=5").then(function (data) {
    RecentBlogs.append(data);
    if ($("#BlogList").text().trim() === "") {
      RecentBlogs.text("It looks like there are no blogs posted yet.");
    }
  });
});
