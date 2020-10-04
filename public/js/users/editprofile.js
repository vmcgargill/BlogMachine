$(document).ready(function() {

    const updateProfile = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("name", $("#name").val())
        formData.append("email", $("#email").val())
        formData.append("title", $("#title").val())
        formData.append("bio", $("#bio").val())
        formData.append("hobbies", $("#hobbies").val())
        formData.append("interests", $("#interests").val())
        formData.append("website", $("#website").val())

        const image = document.getElementById("picture");
        if (image.files[0]) {
            formData.append("picture", image.files[0])
        }

        let website = $("#website").val().trim();
        if (website !== "") {
            function isUrl(str) {
                try { new URL(str); } catch (_) { return false; }
                return true;
            }
            if (isUrl(website) === false) {
                handleErr("Error: The link '" + website + "' is invalid. Please try again.")
            }
        }

        $.ajax({
            method: "PUT",
            url: "/api/editProfile",
            enctype: 'multipart/form-data',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000
        }).then(function() {
            window.location.href = "/UserProfile";
        }).catch(handleErr)
    }

    $("#updateprofile").on("submit", updateProfile);

});