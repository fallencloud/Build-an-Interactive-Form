$(function() {
    let $menuBtn = $('#drop-btn');
    const $menu = $('.drop-body');

    // if ($window.width() < 768) {
    //     $menu.css({'display': 'none'});
    // }

 $(window).resize(function () {
        if ($(this).width() >= 768) {
            $menu.show();
        }
    });

    $menuBtn.on('click', function() {
        $menu.slideToggle();

    });

const $registration = $('.registration');
const $modal = $('#modal');

$registration.on('click', function() {
    $modal.slideDown();
})


});

