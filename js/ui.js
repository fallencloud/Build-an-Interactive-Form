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
const $cancel = $('#modal #cancel');

$registration.on('click', function() {
    let screenTop = $(document).scrollTop();
    $modal.slideDown();
    $modal.css({
        "top" : screenTop,
        "display": "flex",
        "flex-direction" : "column",
        "justify-content" : "center"
    });
});

$cancel.on('click', function() {
    $modal.slideUp();
    $modal.css(
        {
            "display": "none"
        }
    );
})


});

