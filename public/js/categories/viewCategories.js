$("#createCategory").on("click", function () {
    const createCategoryInput = $("#createCategoryInput").val().trim()
    if (createCategoryInput !== "") {
        $.post("/api/categories", {name: createCategoryInput}).then(function() {
            location.reload();
        })
    }
})

$("#deleteCategory").on("click", function () {
    const deleteCategorySelect = $("#deleteCategorySelect").val()
    console.log(deleteCategorySelect)
    if (deleteCategorySelect !== "selectCategory") {
        $.ajax({
            method: "DELETE",
            url: "/api/categories/" + deleteCategorySelect
        }).then(function() {
            location.reload();
        })
    }
})