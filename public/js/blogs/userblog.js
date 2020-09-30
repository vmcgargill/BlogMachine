$("#edit-blog").on("click", function() {
    let id = $(this).val()
    window.location.href = "/editBlog/?blog_id=" + id;
})