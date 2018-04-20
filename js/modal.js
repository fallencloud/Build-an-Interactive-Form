$(function() {
const $registration = $('.registration');
const $modal = $('#modal');
const $cancel = $('#modal #cancel');
const $nextButton = $('#next').hide();

$registration.on('click', function() {
    let screenTop = $(document).scrollTop();
    $modal.slideDown();
    $modal.css({
        "top" : screenTop,
        "display": "flex",
        "flex-direction" : "column",
        "justify-content" : "center"
    });

    const $formFields = $('#modal #form-body fieldset');
    showForm($formFields);
});

function showForm($formFields) {
    //hide the long version of the form
    $formFields.hide();

    //show the next button & hide submit
    $nextButton.show();
    $('button[id="submit"]').hide();

    //show the first section
    let currentSection = $formFields.first();
    $formFields.first().show();

    //when the next button is clicked
        //validate the current section and show the next section
    
    $nextButton.on('click', function (e) {
        let isValid = true;

        if (currentSection.attr('class') === 'basic') {
            isValid = checkName();
            isValid = checkEmail();
            if (isValid) {
                currentSection.fadeOut('slow');
                currentSection = currentSection.next();
                currentSection.fadeIn('slow');
            }
        } else if (currentSection.attr('class') === 'shirt') {
            //no validation required
            currentSection.fadeOut('slow');
            currentSection = currentSection.next();
            currentSection.fadeIn('slow');
        } else if (currentSection.attr('class') === 'activities') {
            isValid = checkActivities();
            
            if (isValid) {
                currentSection.fadeOut('slow');
                currentSection = currentSection.next();
                currentSection.fadeIn('slow');
                $("#submit").show();
                $nextButton.hide();
            }
        } 
    })
}

$cancel.on('click', function() {
    $modal.slideUp();
    $modal.css(
        {
            "display": "none"
        }
    );
});
});