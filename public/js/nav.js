$(document).ready(function(){
    $.get("/api/user_data").then(function(data) {
        if (data === null) {
            document.getElementById('Login').classList.remove('hidden');
            document.getElementById('Signup').classList.remove('hidden');
        } else {
            document.getElementById('LoggedInMenu').classList.remove('hidden');
        }
    });

    $.get("/api/blogSearchSuggestions").then(function(data) {
        $('#SearchBlogInput').autocomplete({
            source: data
        });
    });

    $("#SearchBlogBtn").on("click", function() {
        let SearchBlogInput = $("#SearchBlogInput").val().trim();
        if (SearchBlogInput === "") {
            $("#searchAlert").fadeIn(500);
            $("#searchAlert .msg").text("Error: Search field is empty");
        } else {
            window.location.href = "/blogSearch/" + SearchBlogInput
        }
    });
});