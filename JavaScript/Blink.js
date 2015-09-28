var blinks = document.getElementsByClassName('blink');

function setBlinkColor(color, blinks) {
    for (var i = 0; i < blinks.length; i++) {
        blinks[i].style.color = color;
    }
}
setInterval(function () {
    setBlinkColor("white", blinks);
}, 1000);

setTimeout(
function () {
    setInterval(function () {
        setBlinkColor("black", blinks);
    }, 1000);
}, 500);