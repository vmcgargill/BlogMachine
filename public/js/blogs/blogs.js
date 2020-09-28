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
        let BlogTitles = BlogList[i].getElementsByTagName("a")[0];
        let BlogDescriptions = BlogList[i].getElementsByTagName("a")[1];
        let BlogAuthors = BlogList[i].getElementsByTagName("a")[2];
        let BlogCategories = BlogList[i].getElementsByTagName("a")[3];
        let BlogMood = BlogList[i].getElementsByTagName("a")[4];
        let titleText = BlogTitles.textContent || BlogTitles.innerText;
        let descriptionText = BlogDescriptions.textContent || BlogDescriptions.innerText;
        let authorText = BlogAuthors.textContent || BlogAuthors.innerText;
        let categoryText = BlogCategories.textContent || BlogCategories.innerText;
        let moodText = BlogMood.textContent || BlogMood.innerText;
        if (titleText.toUpperCase().indexOf(SearchFilteresBlogs) > -1 || 
        descriptionText.toUpperCase().indexOf(SearchFilteresBlogs) > -1 || 
        authorText.toUpperCase().indexOf(SearchFilteresBlogs) > -1 || 
        categoryText.toUpperCase().indexOf(SearchFilteresBlogs) > -1 || 
        moodText.toUpperCase().indexOf(SearchFilteresBlogs) > -1) {
            BlogList[i].style.display = "";
        } else {
            BlogList[i].style.display = "none";
        }
    }
});