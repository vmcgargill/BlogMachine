$(document).ready(function() {

  // Submit blog
  const submitBlog = (event) => {
    event.preventDefault();
    let Id;
    const url = window.location.search;
    const updating = false;
    const title = $("#title").val();
    const body = $("#body").val();

    const renderBloginputs = (Id) => {
      $.get("/api/blogs/" + Id).then(function(data){
        title = data.title;
        body = data.body;
      });
    };

    function handleLoginErr() {
      $("#alert .msg").text("Error: It looks like something went wrong. Please try again.");
      $("#alert").fadeIn(500);
    }

    // Check if this is a blog being updated
    if (url.indexOf("?blog_id=") !== -1) {
      Id = url.split("=")[1];
      updating = true;
      renderBloginputs(Id);
    }

    if (body.trim() === "" || title.trim() === "") {
      $("#alert .msg").text("Title and body field cannot be left empty");
      $("#alert").fadeIn(500);
      return;
    }

    if (updating === false) {
      $.post("/api/blogs", {
        title: title,
        body: body
      }).then(function() {
        window.location.href = "/";
      }).catch(handleLoginErr);
    } else if (updating === true) {
      $.put("/api/blogs/" + Id, {
        title: title,
        body: body
      }).then(function() {
        window.location.href = "/";
      }).catch(handleLoginErr);
    }

  };

  // Add on submit event listener
  $("#submitForm").on("submit", submitBlog);

});