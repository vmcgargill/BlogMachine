$(document).ready(function() {
    const FilterBlogs = $("#FilterBlogs");
    const DropDowns = $(".DropDowns");

    
    $.get("/api/blogs/?&order=DESC").then(function(data) {
        FilterBlogs.append(data)
        if (FilterBlogs.html().trim() === "") {
            handleErr("It looks like there are no blogs posted yet.");
        }
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
            if (FilterBlogs.trim().empty()) {
                handleErr("It looks like there are no blogs that match your filter");
            }
        });
    });
    
    $("#SearchFilteresBlogs").keyup(function() {
        let SearchFilteresBlogs = $("#SearchFilteresBlogs").val().toUpperCase();
        let BlogList = document.getElementsByClassName("blogSearch");
        console.log(BlogList)
        for (let i = 0; i < BlogList.length; i++) {
            if (BlogList[i].innerText.toUpperCase().indexOf(SearchFilteresBlogs) > -1) {
                BlogList[i].style.display = "";
            } else {
                BlogList[i].style.display = "none";
            }
        }
    });
});
