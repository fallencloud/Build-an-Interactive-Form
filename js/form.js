const $titleList = $('#title');
const $otherTitle = $('#other-title');
//hide the other field on page load
$otherTitle.hide();

//show an input field if other is selected
$titleList.on('change', function(e) {
    if (e.target.value === 'other') {
        $otherTitle.show();
    } else {
        $otherTitle.hide();
    }
});

//show only the colors that match the theme
const $designList = $('#design');
const $colorsList = $('#color option');
$('#color').hide();

$designList.on('change', function(e) {
    const shirtValue = e.target.value;
    $('#color').show();
    chooseColors(shirtValue, $colorsList);
});

function chooseColors(shirtValue, $colorsList) {
    function hideAllColors() {
        $.each($colorsList, function() {
            $(this).hide();
        });
    }//end hideAllColors()

    function showAllColors() {
        $.each($colorsList, function() {
            $(this).show();
        });
    }//end showAllColors()

    function showPunColors() {
        $.each($colorsList, function () {
            let lowest = $colorsList.length;
            if ($(this).text().match('Puns')) {
                $(this).show();
                lowest = $(this);
            } else {
                $(this).hide();
            }
        });
    }//end showPunColors()

    function showHeartColors() {
        $.each($colorsList, function () {
            let lowest = $colorsList.length;
            if (!$(this).text().match('Puns')) {
                $(this).show();
                lowest = $(this);
            } else {
                $(this).hide();
            }
        });
    }//end showPunColors()

    if(shirtValue === 'js puns') {
        showPunColors(); 
    } else if (shirtValue === 'Select Theme') {
        showAllColors();
    } else {
        showHeartColors();
    }
}