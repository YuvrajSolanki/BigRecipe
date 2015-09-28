var apiKey = getKey();
$(document).ready(function () {
    var wait = "<div class='' align='center'>" +
            "<h4><span style='color:#004687;'>Please wait...</span></h4>" +
            "</div>";
    var noResult = "<div class='' align='center'>" +
        "<h4><span style='color:#004687;'>No Result found, Please change your search value</span></h4>" +
        "</div>";
    var limitOver = "<div class='' align='center'>" +
        "<h4><span style='color:#004687;'>API limit is over, Please try changing keys sequence in keyList array of keySelector.js</span></h4>" +
        "</div>";
    $("#searchButton").click(function () {
        $('#wrap2').hide();
        $('#frame').hide();
        $("#video").hide();
        $("#table").hide();

        var keyword = $("#searchBox").val();
        if(keyword == ''){
            $("#error").show();
            $(".output").html("");
            $("#wrap2").hide();

        } else {
            $("#error").hide();
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: "http://api.bigoven.com/recipes?pg=1&rpp=4&any_kw=" + keyword + "&api_key=" + apiKey,
            beforeSend: function () {
                $(".output").html(wait);
            },
            success: function (data) {
                if(data.ResultCount){
                    var final = "";
                    final += "<table id='searchTable'>";

                    final += "<tr class='searchRow1'>";
                    $.each(data.Results, function (k, v) {
                        final += "<td><img src ='" + v.ImageURL120 + "'></img></td>";
                    });
                    final += "</tr>";

                    final += "<tr class='searchRow1'>";
                    $.each(data.Results, function (k, v) {
                        final += "<td id='searchedRecipeTitle'>" + v.Title + "</td>";
                    });
                    final += "</tr>";

                    final += "<tr>";
                    $.each(data.Results, function (k, v) {
                        final += "<td><button class='getRecipe btn btn-primary' id =" + v.RecipeID + ">Recipe</button></td>";
                    });
                    final += "</tr>";

                    final += "</table>";
                    $(".output").html(final);
                } else if(data.StatusCode) {
                    $(".output").html(limitOver);
                } else {
                    $(".output").html(noResult);
                }
            }
        });
        }
    });

    $(document).on("click", ".getRecipe", function () {
        var apiKey = getKey();

        $("#videoTitle2").hide();
        $('#titleTab2').html("");
        $('#ingredientsTab2').html("");
        $('#recipeTab2').html("");
        $('#videoTab2').html("");
        var recipeID = $(this).attr("id");
        var params = { 'recipeid': recipeID }
        $.ajax({
            type: 'POST',
            url: "Popular.asmx/insertID",
            contentType: 'application/json',
            datatype: 'json',
            data: JSON.stringify(params),
            success: function (response) {
            }
        });
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: "http://api.bigoven.com/recipe/" + recipeID + "?api_key=" + apiKey,
            success: function (data) {
                if(data.RecipeID){
                    $("#wrap2").show();
                    var recipename = data.Title;
                    if (data.Title) {
                        $("#titleTab2").append("<div><b>Recipe title:-</b><span id='recipeTitle'>" + data.Title + "</span><br></div>");
                    }

                    if (data.Description) {
                        $("#titleTab2").append("<div><b>Recipe Description:-</b><span id='recipeDescription'>" + data.Description + "</span></div>");
                    }

                    if (data.Cuisine) {
                        $("#titleTab2").append("<div><b>Cusisine:-</b><span id='recipeCuisine'>" + data.Cuisine + "</span></div>");
                    }

                    if (data.Category) {
                        $("#titleTab2").append("<div><b>Category:-</b><span id='recipeCategory'>" + data.Category + "</span></div>");
                    }
                    if (data.TotalMinutes) {
                        $("#titleTab2").append("<div><b>Prepration Minute:-</b><span id='totalMinutes'>" + data.TotalMinutes + "</span></div>");
                    }
                    $.each(data.Ingredients, function (k1, v1) {
                        var unit = (v1.Unit != null) ? v1.Unit : "";
                        $("#ingredientsTab2").append('<li>' + v1.Name + ' ' + v1.Quantity + ' ' + unit + '<br/>' + '</li>');
                    });
                    $("#recipeTab2").append(data.Instructions);
                    youTube(recipename);
                }  else if(data.StatusCode) {
                    $(".output").html(limitOver);
                } else {
                    $(".output").html(noResult);
                }
            }
        });
    });

    function youTube(search) {
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: 'http://gdata.youtube.com/feeds/api/videos/?v=2&alt=jsonc&orderby=viewCount&genre=23&max-results=1&autoplay=0&q=recipes' + search,
            success: function (data) {
                if (data.data.items[0].title) {
                    $("#videoTitle2").show();
                    var id = data.data.items[0].id;
                    $("#videoTab2").html("<div id='searchVideoFrame'><iframe class='frame' src='" + "http://www.youtube.com/embed/" + id + "?rel=0&autoplay=0" + "' > </iframe></div>");
                    $(".frame").css("height", parseInt($(".frame").css("width")) * 0.60);
                }
            }
        });
    }
});