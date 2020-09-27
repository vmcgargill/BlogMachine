const FilterBlogs = $("#FilterBlogs");
const UserDropDown = $("#users");

$.get("/api/blogs").then(function(data) {
    FilterBlogs.append(data)
});

UserDropDown.change(function() {
    FilterBlogs.empty();
    let UserId = $("#users").val();
    let API = ""

    if (UserId === "AllUsers") {
        API = "/api/blogs"
    } else {
        API = "/api/blogs/?user_id=" + UserId;
    }

    $.get(API, ).then(function(data) {
        console.log(data)
        FilterBlogs.append(data)
    });
}); 