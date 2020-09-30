$("#edit-blog").on("click", function() {
    let id = $(this).val()
    console.log(id);
    window.location.href = "/editBlog/?blog_id=" + id;
})