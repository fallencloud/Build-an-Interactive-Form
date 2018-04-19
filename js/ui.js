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
});

//accordian
const $panels = $('.accordian li > p');
let $currentP = $panels.first().text();
$panels.hide();
$panels.first().show();

$('.accordian li > h3').on('click', function(e) {
    let $nextLi = $(this).parent();
    let $nextP = $nextLi.find('p');
    if ($nextP.text() !== $currentP) { 
        $panels.slideUp();       
        $nextP.slideDown();
        $currentP = $nextP.text();
    }
});


});

