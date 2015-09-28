$(document).ready(function () {
    var apiKey = "dvx2m0ezB6VgGO0Kujmx9RxG817UI9bc";
    $(".imageRow img").click(function () {
        var id = $(this).attr("id");
        window.open("varieties.html?id=" + id + "", "_blank");
    });

    //$(".frame").css("height", parseInt($(".frame").css("width")) * 0.60);
    

    $(window).resize(function () {
        $(".frame").css("height", parseInt($(".frame").css("width")) * 0.60);        
    });
});