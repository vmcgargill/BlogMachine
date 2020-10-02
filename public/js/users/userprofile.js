$("#edit-profile").on("click", function() {
    const id = $(this).val();
    window.location.href = "/editprofile/?user_id=" + id;
})
