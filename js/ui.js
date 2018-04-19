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


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
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

