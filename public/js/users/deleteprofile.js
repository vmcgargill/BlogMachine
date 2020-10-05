$(document).ready(function() {
    let email = document.getElementById("user-email").getAttribute("value");
    $("#delete-profile").on("click", function(event) {
        event.preventDefault();
        let password = $("#password-input").val();
        $("#password-input").val("");
        if (password.trim() === "") {
            handleErr("Please enter a password to delete your account.")
        } else {
            $.ajax({
                method: "DELETE",
                url: "/api/deleteProfile",
                data: {
                    password: password,
                    email: email
                }
            }).then(function(data) {
                console.log(data)
                if (data.success) {
                    window.location.href = "/logout"
                }
            }).catch(handleDeleteErr);
        }
    });

    function handleDeleteErr() {
        $("#alert .msg").text("Password is incorrect. Please try again.");
        $("#alert").fadeIn(500);
    }
});

