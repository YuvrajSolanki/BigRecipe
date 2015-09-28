$(document).ready(function () {
    $('.tabMenu .tab-links a').on('click', function (e) {
        $('.output').html("");
        $('#wrap2').hide("");
        $("input[type=text]").val("");
        var currentAttrValue = $(this).attr('href');
        $('.tabMenu ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
    });
});

$(document).ready (function () {
    $('.tabMenu1 .tab-links1 a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');
        $('.tabMenu1 ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
        $(this).parent('li').addClass('active1').siblings().removeClass('active1');
        e.preventDefault();
    });
});

$(document).ready(function () {
    $('.tabMenu2 .tab-links2 a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');
        $('.tabMenu2 ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
        $(this).parent('li').addClass('active2').siblings().removeClass('active2');
        e.preventDefault();
    });
});

$(document).ready(function () {
    $('.tabMenu3 .tab-links3 a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');
        $('.tabMenu3 ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
        $(this).parent('li').addClass('active3').siblings().removeClass('active3');
        e.preventDefault();
    });
});