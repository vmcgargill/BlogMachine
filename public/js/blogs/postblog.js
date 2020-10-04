$(document).ready(function() {

    const MoodDropdown = $("#mood");
    const moodInput = $("#moodInput");
    const url = window.location.search;
    let Id;
    let updating = false;

    MoodDropdown.change(function() {
        if (MoodDropdown.val() === "Other") {
            moodInput.removeClass("hidden");
        } else {
            moodInput.addClass("hidden");
        }
    });
    
    const renderBloginputs = (Id) => {
        $.get("/api/blogs/" + Id).then(function (data) {
            $("#moodInput").val(data.mood);
            $("#title").val(data.title);
            $("#body").val(data.body);
            $("#category").val(data.CategoryId);

            
            if (data.mood === null) {
                MoodDropdown.val("None");
            } else {
                let MoodOpt = document.getElementsByClassName("MoodOpt");
                for (let index = 0; index < MoodOpt.length; index++) {
                    const MoodVal = MoodOpt[index].value;
                    if (MoodVal === data.mood) {
                        MoodDropdown.val(data.mood);
                        moodInput.addClass("hidden");
                        return;
                    } else {
                        MoodDropdown.val("Other");
                        moodInput.removeClass("hidden");
                    }
                }
            }
        });
    }

    // Check if this is a blog being updated
    if (url.indexOf("?blog_id=") !== -1) {
        Id = url.split("=")[1];
        updating = true;
        renderBloginputs(Id)
    }
    
    // Submit blog
    const submitBlog = (event) => {
        event.preventDefault();
        let mood = $("#mood").val();
        const title = $("#title").val().trim();
        const body = $("#body").val().trim();
        const category = $("#category").val();

        if (mood === "Other") {
            mood = $("#moodInput").val().trim();
        }
    
        if (body.trim() === "" || title.trim() === "") {
            $("#alert .msg").text();
            handleErr("Title and body field cannot be left empty");
            return;
        }

        if (category === null) {
            handleErr("Please create a category first before posting a blog. Go to Accounts in the navbar then select Categories from the dropdown to create one.");
            return;
        }

        let BlogData = {
            title: title,
            body: body,
            category: category,
            mood: mood
        }

        if (updating === false) {
            $.post("/api/blogs", BlogData).then(function(data) {
                console.log(data)
                window.location.href = "/";
            }).catch(handleErr)
        } else if (updating === true) {
            $.ajax({
                method: "PUT",
                url: "/api/blogs/" + Id,
                data: BlogData
            }).then(function() {
                window.location.href = "/blog/" +Id;
            }).catch(handleErr)
        }
        
    }
    
    // Add on submit event listener
    $("#submitForm").on("submit", submitBlog);

  });
  