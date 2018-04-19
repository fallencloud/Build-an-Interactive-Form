$(function() {
    let $menuBtn = $('#drop-btn');
    const $menu = $('.drop-body');
    $menu.slideUp();

 $(window).resize(function () {
        if ($(this).width() >= 768) {
            $menu.show();
        }
    });

    $menuBtn.on('click', function() {
        $menu.slideToggle();

    });

});