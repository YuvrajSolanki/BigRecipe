var wait = "<div class='' align='center'>" +
                "<h4><span style='color:#D34A72;'>Please wait...</span></h4>" +
                "</div>";
var noResult = "<div class='' align='center'>" +
    "<h4><span style='color:#D34A72;'>No Result found...</span></h4>" +
    "</div>";
var limitOver = "<div class='' align='center'>" +
    "<h4><span style='color:#720000;'>API limit is over, Please try changing keys sequence in keyList array of keySelector.js</span></h4>" +
    "</div>";
function cuisine(keyword) {
    
    var apiKey = "dvx2m0ezB6VgGO0Kujmx9RxG817UI9bc";
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: "http://api.bigoven.com/recipes?pg=1&rpp=4&any_kw=" + keyword + "&api_key=" + apiKey,
        beforeSend: function () {
            $('.please_wait').show();
            $('.main').hide();
            $('#wrap1').hide();
            $('button').hide();
        },
        success: function (data) {
            $('.please_wait').hide();
            if(data.ResultCount){
                $('.main').show();
                $("button").show();
                var j = 1;
                for (var i = 0; i < 4; i++) {
                    $("#image" + j + "").attr({ "width": 400, "height": 300, "src": data.Results[i]["ImageURL"],"alt": data.Results[i]["Title"],"title":data.Results[i]["Title"]});
                    $("#span" + j + "").html(data.Results[i]["Title"]);
                    $("#span" + j + "").closest("figcaption").attr("id", data.Results[i]["RecipeID"]);
                    j++;
                }
            }  else if(data.StatusCode) {
                $('.please_wait').show();
                $(".please_wait").html(limitOver);
            }   else {
                $('.please_wait').show();
                $('.please_wait').html(noResult);
            }
        }
    });
};

$(document).on("click", "#viewMoreButton", function () {
    var apiKey = "dvx2m0ezB6VgGO0Kujmx9RxG817UI9bc";    
    $("#videoTitle").hide();
    $('#titleTab').html("");
    $('#categoryTab').html("");
    $('#ingredientsTab').html("");
    $('#recipeTab').html("");
    $('#videoTab').html("");
    var id = $('input[name=radio-set]:checked').closest("figure").find("figcaption").attr("id");
    recipeID = id;
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: "http://api.bigoven.com/recipe/" + recipeID + "?api_key=" + apiKey,
        beforeSend: function () {
            $("#message").html(wait);
            $("#wrap1").hide();
        },
        success: function (data) {
            if(data.RecipeID){
                $("#message").html("");
                $("#wrap1").show();
            if (data.Title) {
                $("#titleTab").append("<div><b>Recipe title:-</b><span id='recipeTitle'>" + data.Title + "</span><br></div>");
            }

            if (data.Description) {
                $("#titleTab").append("<div><b>Recipe Description:-</b><span id='recipeDescription'>" + data.Description + "</span></div>");
            }

            if (data.Cuisine) {
                $("#titleTab").append("<div><b>Cusisine:-</b><span id='recipeCuisine'>" + data.Cuisine + "</span></div>");
            }

            if (data.Category) {
                $("#titleTab").append("<div><b>Category:-</b><span id='recipeCategory'>" + data.Category + "</span></div>");
            }
            if (data.TotalMinutes) {
                $("#titleTab").append("<div><b>Prepration Minute:-</b><span id='totalMinutes'>" + data.TotalMinutes + "</span></div>");
            }

            $("#titleTab").append(" <div><b>Ratings:-</b><span><ul class='star-rating'>" +
                    "<li id='current-rating' class='current-rating'></li>" +
                    "<span id='ratelinks'>" +
                    "<li><a class='one-star' href='javascript:void(0)'>1</a></li>" +
                    "<li><a class='two-stars' href='javascript:void(0)'>2</a></li>" +
                    "<li><a class='three-stars' href='javascript:void(0)'>3</a></li>" +
                    "<li><a class='four-stars' href='javascript:void(0)'>4</a></li>" +
                    "<li><a class='five-stars' href='javascript:void(0)'>5</a></li>" +
                    "</span>" +
            "</ul></span></div>");
            var ratings = parseInt((data.StarRating * 20));
            $("#current-rating").css({ width: "" + ratings + "%" });
            $("#ratelinks").remove();

            var recipename = data.Title;

            $.each(data.Ingredients, function (k1, v1) {
                var unit = (v1.Unit != null) ? v1.Unit : "";
                $("#ingredientsTab").append('<li>' + v1.Name + ' ' + v1.Quantity + ' ' + unit + '<br/>' + '</li>');
            });
            $("#recipeTab").append(data.Instructions);
            youTube(recipename);
            } else if (data.StatusCode) {
                $("#message").html(limitOver);
            } else {
                $("#message").html(noResult);
            }
        }
    });

    function youTube(search) {
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: 'http://gdata.youtube.com/feeds/api/videos/?v=2&alt=jsonc&orderby=viewCount&genre=23&max-results=1&autoplay=0&q=recipes' + search,
            success: function (data) {
                if (data.data.items[0].title) {
                    $("#videoTitle").show();
                    var id = data.data.items[0].id;
                    $("#videoTab").html("<iframe class='frame' src='" + "http://www.youtube.com/embed/" + id + "?rel=0&autoplay=0" + "' > </iframe>");
                    $(".frame").css("height", parseInt($(".frame").css("width")) * 0.60);
                }
            }
        });
    }
});