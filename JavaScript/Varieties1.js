var apiKey = getKey();
$(document).ready(function () {
    var wait = "<div class='' align='center'>" +
        "<h4><span style='color:#004687;'>Please wait...</span></h4>" +
        "</div>";
    var limitOver = "<div class='' align='center'>" +
        "<h4><span style='color:#004687;'>API limit is over, Please try changing keys sequence in keyList array of keySelector.js</span></h4>" +
        "</div>";
    var a = window.location.toString();
    var recipeID = a.substring(a.indexOf("=") + 1);
    $("#accordianContent").show();
    $("#title").html("");
    $("#ingredients").html("");
    $("#recipe").html("");    
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: "http://api.bigoven.com/recipe/" + recipeID + "?api_key=" + apiKey,
        beforeSend: function(){
               $("#pleaseWait").html(wait);
        },
        success: function (data) {
            $("#pleaseWait").html("");
            if (data.RecipeID) {
                $("#singleTitle").append("<span>" + data.Title + "<span>");
                $("#singleImg").attr("src", data.ImageURL);
                $("#singleImg").attr("alt", data.Title);
                $("#singleImg").attr("title", data.Title);

                if (data.Title) {
                    $("#title").append("<div><b>Recipe title:-</b><span id='recipeTitle'>" + data.Title + "</span><br></div>");
                }

                if (data.Description) {
                    $("#title").append("<div><b>Recipe Description:-</b><span id='recipeDescription'>" + data.Description + "</span></div>");
                }

                if (data.Cuisine) {
                    $("#title").append("<div><b>Cusisine:-</b><span id='recipeCuisine'>" + data.Cuisine + "</span></div>");
                }

                if (data.Category) {
                    $("#title").append("<div><b>Category:-</b><span id='recipeCategory'>" + data.Category + "</span></div>");
                }
                if (data.TotalMinutes) {
                    $("#title").append("<div><b>Prepration Minute:-</b><span id='totalMinutes'>" + data.TotalMinutes + "</span></div>");
                }

                $.each(data.Ingredients, function (k1, v1) {
                    var unit = (v1.Unit != null) ? v1.Unit : "";
                    $("#ingredients").append('<li>' + v1.Name + ' ' + v1.Quantity + ' ' + unit + ',' + '</li>');

                });
                $("#recipe").append(data.Instructions);
                recipe_title = data.Title;
                youTube(recipe_title);
            } else {
                $("#pleaseWait").html(limitOver);
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
            if ((data.data.items[0].title) > 0) {
                $("#frame").show();
                var id = data.data.items[0].id;
                $("#frame").attr("src", "http://www.youtube.com/embed/" + id + "?rel=0&autoplay=0");
            }
            else {
                $("#video").append("no video found");
            }
        }
    });
}