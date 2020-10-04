$(document).ready(function() {

    $("#createCategory").on("click", function () {
        const createCategoryInput = $("#createCategoryInput").val().trim()
        if (createCategoryInput !== "") {
            $.post("/api/categories", {name: createCategoryInput}).then(function(data) {
                if (data.error) {
                    handleErr(data.error);
                } else {
                    $("#createCategoryInput").val("");
                    $("#createCategoryAlert").fadeIn(500);
                    $("#createCategoryAlert .msg").text(data.message);
                    let newCategory = $("<option>");
                    newCategory.val(data.id);
                    newCategory.text(data.name);
                    $("#deleteCategorySelect").append(newCategory);
                }
            }).catch(handleErr);
        } else {
            handleErr("Error: Category Name Cannot be empty!")
        }
    });
    
    $("#deleteCategory").on("click", function () {
        const deleteCategorySelect = $("#deleteCategorySelect").val();
        if (deleteCategorySelect !== "selectCategory") {
            $.ajax({
                method: "DELETE",
                url: "/api/categories/" + deleteCategorySelect
            }).then(function(data) {
                if (data.error) {
                    handleErr(data.error);
                } else {
                    $("#createCategoryAlert").fadeIn(500);
                    $("#createCategoryAlert .msg").text(data.message);
                    let options = document.getElementsByTagName("option");
                    for (let i = 0; i < options.length; i++) {
                        const categoryOption = options[i];
                        if (categoryOption.value === deleteCategorySelect) {
                            categoryOption.remove();
                        }
                    }
                }
            }).catch(handleErr);
        } else {
            handleErr("Please select a category to delete!")
        }
    });

});
