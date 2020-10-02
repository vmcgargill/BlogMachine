
$(document).ready(function() {

    const updateProfile = (event) => {
        event.preventDefault();
        const image = $("#profilePicture").val();
        console.log("THE IMAGE VALUE IS: " + image)
        // window.location.href = "/editprofile/?user_id=" + id;

        let user = {
            picture: image
        }

        $.ajax({
            method: "PUT",
            url: "/api/editProfile",
            data: user
        })
    }

    $("#updateprofile").on("submit", updateProfile);

});