$(document).ready(function() {
    if ($("#memberRow").html().trim() === "") {
        $("#NoNembers").text("It looks like no members have joined yet. Click on Create Account to create and account.")
    }
});