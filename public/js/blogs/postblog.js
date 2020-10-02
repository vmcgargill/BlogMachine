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
    })

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

    function handleLoginErr() {
        $("#alert .msg").text("Error: It looks like something went wrong. Please try again.");
        $("#alert").fadeIn(500);
      }
    
    // Submit blog
    const submitBlog = (event) => {
        event.preventDefault();
        let mood = $("#mood").val();
        const title = $("#title").val();
        const body = $("#body").val();
        const category = $("#category").val();

        if (mood === "Other") {
            mood = $("#moodInput").val();
        }
    

        if (body.trim() === "" || title.trim() === "") {
            $("#alert .msg").text("Title and body field cannot be left empty");
            $("#alert").fadeIn(500);
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
            }).catch(handleLoginErr)
        } else if (updating === true) {
            $.ajax({
                method: "PUT",
                url: "/api/blogs/" + Id,
                data: BlogData
            }).then(function() {
                window.location.href = "/blog/" +Id;
            }).catch(handleLoginErr)
        }
        
    }
    
    // Add on submit event listener
    $("#submitForm").on("submit", submitBlog);

  });
  