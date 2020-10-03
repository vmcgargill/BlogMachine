$("#edit-blog").on("click", function() {
    let id = $(this).val();
    window.location.href = "/editBlog/?blog_id=" + id;
})

$("#delete-blog").on("click", function() {
    let id = $(this).val();
    let deleteBlog = confirm("Are you sure you want to delete this blog?");
    if (deleteBlog === true) {
        $.ajax({
            method: "DELETE",
            url: "/api/blogs/" + id
        }).then(function() {
            window.location.href = "/"
        })
    }
})