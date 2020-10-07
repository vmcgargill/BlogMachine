$(document).ready(function () {

  const MoodDropdown = $("#mood");
  const moodInput = $("#moodInput");
  const url = window.location.search;
  let Id;
  let updating = false;

  // Listens for mood dropdown change. If mood dropdown is changed to "Other" then it will display the moodInput elelment so user can enter a custom mood for blog.
  MoodDropdown.change(function () {
    if (MoodDropdown.val() === "Other") {
      moodInput.removeClass("hidden");
    } else {
      moodInput.addClass("hidden");
    }
  });

  // If the user is editing an existing blog, then it will get the exisitng blog details and display them in the inputs.
  // This makes it easier for editing exisitn blogs, the user can make small changes instead of staring over from scratch
  const renderBloginputs = (Id) => {
    $.get("/api/blogs/" + Id).then(function (data) {
      $("#title").val(data.title);
      $("#body").val(data.body);
      $("#category").val(data.CategoryId);
      // Sets the mood input to whatever value the current blog mood is
      $("#moodInput").val(data.mood);

      // This checks what mood the current blog is. If the current mood is null, then the mood dropdown will be slected at None.
      if (data.mood === null) {
        MoodDropdown.val("None");
      } else {
        // Otherwise it will use a for loop to find which mood the blog is and set the dropdown as that value
        let MoodOpt = document.getElementsByClassName("MoodOpt");
        for (let index = 0; index < MoodOpt.length; index++) {
          const MoodVal = MoodOpt[index].value;
          if (MoodVal === data.mood) {
            MoodDropdown.val(data.mood);
            moodInput.addClass("hidden");
            return;
          // Or it will select the Other dropdown option and display the mood input.
          } else {
            MoodDropdown.val("Other");
            moodInput.removeClass("hidden");
          }
        }
      }
    });
  };

  // Checks if blog is existing blog being updated.
  if (url.indexOf("?blog_id=") !== -1) {
    Id = url.split("=")[1];
    updating = true;
    renderBloginputs(Id);
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
    };

    if (updating === false) {
      $.post("/api/blogs", BlogData).then(function () {
        window.location.href = "/";
      }).catch(handleErr);
    } else if (updating === true) {
      $.ajax({
        method: "PUT",
        url: "/api/blogs/" + Id,
        data: BlogData
      }).then(function () {
        window.location.href = "/blog/" + Id;
      }).catch(handleErr);
    }
  };

  // Add on submit event listener
  $("#submitForm").on("submit", submitBlog);

});
