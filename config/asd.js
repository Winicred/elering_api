$(document).ready(function () {
    $("#page2").css({
        display: "none",
    });
    
    $("#dalej").click(function () {
        $("#page1").css({
            display: "none",
        });
        $("#page2").css({
            display: "block",
        });
    });

    $("#plecy").click(function () {
        $("#page2").css({
            display: "none",
        });
        $("#page1").css({
            display: "block",
        });
    });
});
