function getMostViewed() {
    $.ajax({
        type: 'POST',
        url: "Popular.asmx/getMostViewed",
        contentType: 'application/json',
        datatype: 'json',
        success: function (response) {
            for (i = 0; i < 4; i++) {
                getFirst(response.d[i],i);
            }            
        }
    });
}

var apiKey = getKey();

function getFirst(id,i){        
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: "http://api.bigoven.com/recipes?pg=1&rpp=8&any_kw=" + id + "&api_key=" + apiKey,
        
        success: function (data) {
            $("#popular" + i).attr("src", data.Results[0].ImageURL120);
            $("#popular" + i).attr("class", data.Results[0].RecipeID);
            $("#pop" + i).html(data.Results[0].Title);            
        }
    });
}


$(document).on("click", ".popularRow1 img", function () {
    var apiKey = getKey();
    var recipeID = $(this).attr("class");    
    $("#videoTitle3").hide();
    $("#wrap3").show();
    $("#titleTab3").html("");
    $("#ingredientsTab3").html("");
    $("#recipeTab3").html("");
    $("#videoTab3").html("");
    
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: "http://api.bigoven.com/recipe/" + recipeID + "?api_key=" + apiKey,

        success: function (data) {            
            if (data.Title) {
                $("#titleTab3").append("<div><b>Recipe title:-</b><span id='recipeTitle'>" + data.Title + "</span><br></div>");
            }

            if (data.Description) {
                $("#titleTab3").append("<div><b>Recipe Description:-</b><span id='recipeDescription'>" + data.Description + "</span></div>");
            }

            if (data.Cuisine) {
                $("#titleTab3").append("<div><b>Cusisine:-</b><span id='recipeCuisine'>" + data.Cuisine + "</span></div>");
            }

            if (data.Category) {
                $("#titleTab3").append("<div><b>Category:-</b><span id='recipeCategory'>" + data.Category + "</span></div>");
            }
            if (data.TotalMinutes) {
                $("#titleTab3").append("<div><b>Prepration Minute:-</b><span id='totalMinutes'>" + data.TotalMinutes + "</span></div>");
            }

            $.each(data.Ingredients, function (k1, v1) {
                var unit = (v1.Unit != null) ? v1.Unit : "";
                $("#ingredientsTab3").append('<li>' + v1.Name + ' ' + v1.Quantity + ' ' + unit + ',' + '</li>');

            });
            $("#recipeTab3").append(data.Instructions);
            recipe_title = data.Title;
            youTube(recipe_title);
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
                $("#videoTitle3").show();
                var id = data.data.items[0].id;
                $("#videoTab3").html("<div id='popularVideoFrame'><iframe class='frame' src='" + "http://www.youtube.com/embed/" + id + "?rel=0&autoplay=0" + "' > </iframe></div>");
                $(".frame").css("height", parseInt($(".frame").css("width")) * 0.60);
            }
        }
    });
}