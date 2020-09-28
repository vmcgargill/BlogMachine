const FilterBlogs = $("#FilterBlogs");
const DropDowns = $(".DropDowns");

$.get("/api/blogs/?&order=DESC").then(function(data) {
    FilterBlogs.append(data)
});

DropDowns.change(function() {
    FilterBlogs.empty();
    let API = ""
    let UserId = $("#users").val();
    let age = $("#age").val();
    let categoryId = $("#categories").val();


    if (age === "newest") {
        API += "/api/blogs/?order=DESC"
    } else if (age === "oldest") {
        API += "/api/blogs/?order=ASC"
    }

    if (UserId !== "AllUsers") {
        API += "&user_id=" + UserId;
    }

    if (categoryId !== "AllCategories") {
        API += "&category=" + categoryId;
    }

    $.get(API).then(function(data) {
        FilterBlogs.append(data)
    });
});

$("#SearchFilteresBlogs").keyup(function() {
    let SearchFilteresBlogs = document.getElementById("SearchFilteresBlogs").value.toUpperCase();
    let BlogList = document.getElementById("BlogList").getElementsByTagName("li");
    for (let i = 0; i < BlogList.length; i++) {
        let BlogTitles = BlogList[i].getElementsByTagName("a")[0, 1];
        let titleText = BlogTitles.textContent || BlogTitles.innerText;
        if (titleText.toUpperCase().indexOf(SearchFilteresBlogs) > -1) {
            BlogList[i].style.display = "";
        } else {
            BlogList[i].style.display = "none";
        }
    }
});