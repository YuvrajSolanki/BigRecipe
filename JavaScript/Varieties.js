var apiKey = getKey();
$(document).ready(function () {
    var wait = "<div class='' align='center'>" +
        "<h4><span style='color:#004687;'>Please wait...</span></h4>" +
        "</div>";
    var limitOver = "<div class='' align='center'>" +
        "<h4><span style='color:#004687;'>API limit is over, Please try changing keys sequence in keyList array of keySelector.js</span></h4>" +
        "</div>";
    var a = window.location.toString();
    var id = a.substring(a.indexOf("=") + 1);
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: "http://api.bigoven.com/recipes?pg=1&rpp=8&any_kw=" + id + "&api_key=" + apiKey,       
        beforeSend: function () {
            $("#pleaseWait").html(wait);
        },
        success: function (data) {
            $("#pleaseWait").html("");
            if(data.ResultCount){
                $("#varietyTitle").append("<span>" + id + "<span>");
                var lenght = ((data + '').length);
                for (var i = 0; i < 8; i++) {
                    var j = (i > 3) ? 2 : 1;
                    $(".row" + j + "").append("<td><img src='" + data.Results[i]["ImageURL120"] + "' id='" + data.Results[i]["RecipeID"] + "' title='" + data.Results[i]["Title"] + "' alt='" + data.Results[i]["Title"] + "'></td>");
                    $(".raw" + j + "").append("<td><span>'" + data.Results[i]["Title"] + "'</span></td>");
                }
            } else {
                $("#pleaseWait").html(limitOver);
            }
        }
    });
});

$(document).on("click", ".varImage img", function () {
    var id = $(this).attr("id");
    window.open("Varieties1.html?id=" + id + "", "_blank");
});