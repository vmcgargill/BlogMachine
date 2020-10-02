$("#edit-profile").on("click", function() {
    const id = $(this).val();
    alert("Edit user profile?");
    window.location.href = "/editprofile/?user_id=" + id;

})
