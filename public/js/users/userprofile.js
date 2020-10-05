$(document).ready(function() {
    $("#edit-profile").on("click", function() {
        window.location.href = "/editprofile";
    });

    $("#delete-profile").on("click", function() {
        window.location.href = "/deleteProfile";
    });
});
