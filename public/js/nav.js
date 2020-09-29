
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
});