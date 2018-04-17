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

//prevent double bookings
//tally and show the price
const $activities = $('.activities .form-check-input');
let price = 0;

$activities.on('change', function (e) {
    let label = $(this).next().text();
    let legend = $('#cost');

    if (e.target.checked === true) {
        price += getCost(label);
        legend.text(`Total: ${price}`);
        legend.show();
        addConflict(label);
    } else {
        price -= getCost(label);
        legend.text(`Total: ${price}`);
        legend.show();
        removeConflict(label);
    }
    
});

function getCost(labelText) {
    let costStart = labelText.indexOf('$') + 1;
    let costEnd = costStart + 3;
    let activityCost = labelText.substring(costStart, costEnd);
    activityCost = parseInt(activityCost);
    return activityCost;
}

function addConflict(labelText) {
    const labelsList = $('.activities .form-check-input');
    const amStatus = labelText.match('am') ? true : false;
    //allows us to ignore the main conference since it has no scheduled conflicts
    const notMain = labelText.match('Main') ? false : true;

    
    //check to see if the checked day and the potential conflict day are the same
    const checkDay = (day) => {
      if (day.indexOf('Wed') !== -1) {
        if (labelText.indexOf('Wed') !== -1) {
          return true;
        }
      } else if (day.indexOf('Tues') !== -1) {
        if (labelText.indexOf('Tues') !== -1) {
          return true;
        }
      } else {
        return false;
      }
    }

    //check for morning conflicts
    const disableAm = () => {
        $.each(labelsList, function() {
            //skip the current item
            if (labelText !== $(this).text()) {
                console.log(labelText, $(this).text());
                //if it has am
                // if ($(this).text().match('am') ? true : false) {
                //     if (checkDay($this).text()) {
                //         $(this).prop('disabled', true);
                //         console.log('am disabled');
                //     }
                // }
            }
        })
        // for (let i = 0; i < labelsList.length; i++) {
        //     if (labelText !== labelsList[i].textContent) {//skip the checked value
        //         if (labelsList[i].textContent.indexOf('am') !== -1) {//look for the expression am
        //             if (checkDay(labelsList[i].textContent) === true) {//verify day if am is found
        //                 labelsList[i].disabled = true;//if both conditions are met, make the item unavailable
        //                 console.log(labelsList[i]);
        //             }                    
        //         }
        //     }
        // }
        
    }

    //checks for evening conflicts
    const disablePm = () => {
        for (let i = 0; i < labelsList.length; i++) {
            if (labelText !== labelsList[i].textContent) {
                if (labelsList[i].textContent.indexOf('4pm') !== -1) {//look for time slots ending at 4pm
                  if (checkDay(labelsList[i].textContent) === true) {//check the day if it ends at 4pm
                    labelsList[i].disabled = true;//if both conditions are met, make the item unavailable
                    console.log(labelsList[i]);
                }
                }
            }
        }
    }

    if (amStatus === true) {//ignore Main Conference since it has no conflicts
        disableAm();
    } else if (!amStatus && notMain) {
        disablePm();
    }
}//end function addConflict

function removeConflict(labelText) {
    const labelsList = document.querySelectorAll('.activities label');
    const amStatus = labelText.indexOf('am') !== -1;
    const notMain = labelText.indexOf('Main') !== -1;

    const enableAm = () => {
        for (let i = 0; i < labelsList.length; i++) {
            if (labelText !== labelsList[i].textContent) {
                if (labelsList[i].textContent.indexOf('am') !== -1) {//check for morning status
                    labelsList[i].disabled = false;//remove the disabled status
                }
            }
        }
    }

    const enablePm = () => {
        for (let i = 0; i < labelsList.length; i++) {
            if (labelText !== labelsList[i].textContent) {
                if (labelsList[i].textContent.indexOf('4pm') !== -1) {
                    labelsList[i].disabled = false;
                }
            }
        }
    }

    if (amStatus && !notMain) {//ignore Main conference
        enableAm();
    } else if (!amStatus && !notMain) {
        enablePm();
    }
}//end function removeConflict
