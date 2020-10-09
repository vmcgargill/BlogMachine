$(document).ready(function () {
  const FilterBlogs = $("#FilterBlogs");
  const DropDowns = $(".DropDowns");

  // API call that gets the most recent blogs first and displays them on screen
  $.get("/api/blogs/?&order=DESC").then(function (data) {
    FilterBlogs.append(data);
    if ($("#BlogList").text().trim() === "") {
      FilterBlogs.text("It looks like there are no blogs posted yet.");
    }
  });


  // Dropdown listener that listens for change in dropdown menu, then sends API call to get filters blogs list according to selected dropdowns
  // This allows user to filter blogs by multiple attributes. For example, a user could filter another users blogs by sepcific category.
  DropDowns.change(function () {
    FilterBlogs.empty();
    let API = "";
    let UserId = $("#users").val();
    let age = $("#age").val();
    let categoryId = $("#categories").val();

    if (age === "newest") {
      API += "/api/blogs/?order=DESC";
    } else if (age === "oldest") {
      API += "/api/blogs/?order=ASC";
    }

    if (UserId !== "AllUsers") {
      API += "&user_id=" + UserId;
    }

    if (categoryId !== "AllCategories") {
      API += "&category=" + categoryId;
    }

    $.get(API).then(function (data) {
      FilterBlogs.append(data);
      if ($("#BlogList").text().trim() === "") {
        FilterBlogs.text("It looks like there are no that match your filter.");
      }
    });
  });

  // This keyup listener function will filter through blogs locally and search for keyword in title, body, mood, cetegory, or user.
  $("#SearchFilteresBlogs").keyup(function () {
    let SearchFilteresBlogs = $("#SearchFilteresBlogs").val().toUpperCase();
    let BlogList = document.getElementsByClassName("blogSearch");
    for (let i = 0; i < BlogList.length; i++) {
      // The innerText property is key here for searching for blogs with the same string as the SearchFilteresBlogs input.
      // It looks at the title, body, mood, category, and author of blogs, then it hides blogs that don't match SearchFilteresBlogs value.
      if (BlogList[i].innerText.toUpperCase().indexOf(SearchFilteresBlogs) > -1) {
        BlogList[i].style.display = "";
      } else {
        BlogList[i].style.display = "none";
      }
    }
  });
});
