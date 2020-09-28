const RecentBlogs = $("#RecentBlogs");

$.get("/api/blogs/?order=DESC&limit=5").then(function(data) {
    RecentBlogs.append(data);
});