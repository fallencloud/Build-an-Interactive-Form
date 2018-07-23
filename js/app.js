//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
const titleList = document.querySelector('#form-body #title');
//hide the other input box on page load
const otherTitle = document.querySelector('#form-body #other-title');
otherTitle.style.display = 'none';
const designList = document.querySelector('#form-body #design');
const colorList = document.querySelector('#form-body #color');
colorList.style.display = 'none'; //hide the color list on load
const activities = document.querySelector('#form-body .activities');
let price = 0;
const payment = document.querySelector('#form-body #payment');
const form = document.querySelector('#form-body form');
const payPal = document.querySelector('#form-body #paypal');
const bitcoin = document.querySelector('#form-body #bitcoin');
const creditCard = document.querySelector('#form-body #credit-card');

//hide all payment options initially
payPal.style.display = 'none';
bitcoin.style.display = 'none';
creditCard.style.display = 'none';



function hidePayement(paymentType) {
  if (paymentType === 'credit card') {
    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
    creditCard.style.display = 'block';
  } else if (paymentType === 'paypal') {
    creditCard.style.display = 'none';
    bitcoin.style.display = 'none';
    payPal.style.display = 'block';
  } else  if (paymentType === 'bitcoin') {
    creditCard.style.display = 'none';
    payPal.style.display = 'none';
    bitcoin.style.display = 'block';
  } else {
    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
    creditCard.style.display = 'none';  
  }
}
function getCost(labelText) {
    let costStart = labelText.indexOf('$') + 1;
    let costEnd = costStart + 3;
    let activityCost = labelText.substring(costStart, costEnd);
    activityCost = parseInt(activityCost);
    return activityCost;
}

function addConflict(labelText) {
    const labelsList = document.querySelectorAll('#form-body .activities label');
    const amStatus = labelText.indexOf('am') !== -1;
    //allows us to ignore the main conference since it has no scheduled conflicts
    const notMain = labelText.indexOf('Main') !== -1;

    //check to see if the checked day and the potential conflict day are the same
    const checkDay = (day) => {
      if (day.indexOf('Wednesday') !== -1) {
        if (labelText.indexOf('Wednesday') !== -1) {
          return true;
        }
      } else if (day.indexOf('Tuesday') !== -1) {
        if (labelText.indexOf('Tuesday') !== -1) {
          return true;
        }
      } else {
        return false;
      }
    }

    //check for morning conflicts
    const disableAm = () => {
        for (let i = 0; i < labelsList.length; i++) {
            if (labelText !== labelsList[i].textContent) {//skip the checked value
                if (labelsList[i].textContent.indexOf('am') !== -1) {//look for the expression am
                    if (checkDay(labelsList[i].textContent) === true) {//verify day if am is found
                        labelsList[i].firstElementChild.disabled = true;//if both conditions are met, make the item unavailable
                    }                    
                }
            }
        }
    }

    //checks for evening conflicts
    const disablePm = () => {
        for (let i = 0; i < labelsList.length; i++) {
            if (labelText !== labelsList[i].textContent) {
                if (labelsList[i].textContent.indexOf('4pm') !== -1) {//look for time slots ending at 4pm
                  if (checkDay(labelsList[i].textContent) === true) {//check the day if it ends at 4pm
                    labelsList[i].firstElementChild.disabled = true;//if both conditions are met, make the item unavailable
                  }
                }
            }
        }
    }

    if (amStatus && !notMain) {//ignore Main Conference since it has no conflicts
        disableAm();
    } else if (!amStatus && !notMain) {
        disablePm();
    }
}//end function addConflict

function removeConflict(labelText) {
    const labelsList = document.querySelectorAll('#form-body .activities label');
    const amStatus = labelText.indexOf('am') !== -1;
    const notMain = labelText.indexOf('Main') !== -1;

    const enableAm = () => {
        for (let i = 0; i < labelsList.length; i++) {
            if (labelText !== labelsList[i].textContent) {
                if (labelsList[i].textContent.indexOf('am') !== -1) {//check for morning status
                    labelsList[i].firstElementChild.disabled = false;//remove the disabled status
                }
            }
        }
    }

    const enablePm = () => {
        for (let i = 0; i < labelsList.length; i++) {
            if (labelText !== labelsList[i].textContent) {
                if (labelsList[i].textContent.indexOf('4pm') !== -1) {
                    labelsList[i].firstElementChild.disabled = false;
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

function chooseColors(shirtValue, colorList) {
    function hideAllColors() {
        for (let i = 0; i < colorList.length; i++) {
            colorList[i].style.display = 'none';
        }
    }

    function showAllColors() {
        for (let i = 0; i < colorList.length; i++) {
            colorList[i].style.display = 'block';
        }
    }

    function showPunColors() {
        for (let i = 0; i < colorList.length; i++) {
          let lowest = colorList.length;  
          if (colorList[i].textContent.indexOf('Puns') !== -1) {
                colorList[i].style.display = 'block';
                if (i <= lowest) {//prevents default from being last value
                  colorList[i].selected = 'true';
                }
            } else {
                colorList[i].style.display = 'none';
            }
        }

    }

    function showHeartColors() {
        for (let i = 0; i < colorList.length; i++) {
            let lowest = colorList.length;

            if (colorList[i].textContent.indexOf('Puns') === -1) {
                colorList[i].style.display = 'block';
                if (i <= lowest) {//prevents default from being last value
                  colorList[i].selected = 'true';
                }
            } else {
                colorList[i].style.display = 'none';
            }
        }
    }

    hideAllColors();
    console.log(shirtValue);
    
    if(shirtValue === 'js puns') {
        showPunColors(); 
    } else if (shirtValue === 'Select Theme') {
        showAllColors();
    } else {
        showHeartColors();
    }


}

function checkName() {
    let isValid = true;
    const name = document.querySelector('#form-body #name');
  //name cannot be blank
  if (name.value < 1) {
    name.className = 'error';
    name.placeholder = 'A name is required';
    isValid = false;
  } else {
    name.className = '';
  }

  return isValid;
}

function checkEmail() {
    const email = document.querySelector('#form-body #mail');
    let isValid = true;

      //email cannot be blank
    if (email.value < 1) {
        email.className = 'error';
        email.placeholder = 'A valid email address is required';
        isValid = false;
    } else if (email.value.indexOf('@') === -1) {
        //verify email is in correct format
        email.className = 'error';
        email.value = '';
        email.placeholder = 'Ex name@example.com';
        isValid = false;
    } else if (email.value.indexOf('.com') === -1) {
        //verify email is in correct format
        email.className = 'error';
        email.value = '';
        email.placeholder = 'Ex name@example.com';
        isValid = false;
    } else {
        email.classList.remove('error');
    }

    return isValid;
}


function checkActivities() {
    //at least one activity must be selected
    let isValid = true;
    let activityList = $('.activities');
    let activity = $('#form-body .activities input[type="checkbox"]:checked');
    console.log(activity);
    
    if (activity.length > 0) {
        isValid = true;
        activityList.removeClass('error');
    } else  {
        activityList.addClass('error');
        isValid = false;    
    }

    return isValid;
  }

function validateForm() {
  let isValid = true; //set to default and only changed if something doesn't validate
  const paymentInfo = document.querySelector('#form-body #payment option[value="credit card"]').selected;
  
    
  isValid = checkName();
  isValid = checkEmail();
  isValid = checkActivities();

  if (paymentInfo) {
      checkCreditInfo();
  }

  function checkCreditInfo() {
    const ccNum = document.querySelector('#form-body #cc-num');
    const zip = document.querySelector('#form-body #zip');
    const cvv = document.querySelector('#form-body #cvv');
      
    //cc num should be a number between 13 and 16 digits
    if (isNaN(parseInt(ccNum.value))) {
        ccNum.classList.add('error');
        ccNum.placeholder = 'not a number';
        ccNum.value = '';
        isValid = false;
    } else if (!(ccNum.value.length >= 13 && ccNum.value.length <= 16)) {
          ccNum.classList.add('error');
          ccNum.placeholder = 'too long or short';
          ccNum.value = '';
          isValid = false;
    } else {
        ccNum.classList.remove('error');
    }
    //zip code should be a number that is 5 digits
    if (isNaN(parseInt(zip.value))) {
        zip.classList.add('error');
        zip.placeholder = 'not a number';
        zip.value = '';
        isValid = false;
    } else if (zip.value.length !== 5 ) {
        zip.classList.add('error');
        zip.placeholder = '5 digits only';
        zip.value = '';
        isValid = false;
    } else {
        zip.classList.remove('error');
    }
    //cvv should be a number that is 3 digits
    if(isNaN(parseInt(cvv.value))) {
        cvv.classList.add('error');
        cvv.placeholder = 'not a number';
        cvv.value = '';
        isValid = false;
    } else if (cvv.value.length !== 3) {
        cvv.classList.add('error');
        cvv.placeholder = '3 digits only';
        isValid = false;
    } else {
        cvv.classList.remove('error');
    }
}

  if (paymentInfo === true) {
      checkCreditInfo();
  }

  return isValid;
}

titleList.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherTitle.style.display = 'block';
    } else {
        otherTitle.style.display = 'none';
    }
});

designList.addEventListener('change', (e) => {
    const shirtValue = e.target.value;
    colorList.style.display = 'block';
    chooseColors(shirtValue, colorList);
});

activities.addEventListener('change', (e) => {
    let label = e.target.parentNode.textContent;
    let legend = document.querySelector('#form-body #cost');
    if (e.target.checked === true) {
        price += getCost(label);
        legend.textContent = `Total: ${price}`;
        legend.style.display = 'block';
        addConflict(label);
    } else {
        price -= getCost(label);
        legend.textContent = `Total: ${price}`;
        legend.style.display = 'block';
        removeConflict(label);
    }
});

payment.addEventListener('change', (e) => {
  const paymentType = e.target.value;
  hidePayement(paymentType);
});

//run the validation function to determine if
  //the form should be submoitted
form.addEventListener('submit', (e) => {

  if (validateForm() === false) {
    e.preventDefault();
  }  
});

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

 //modal
 const $registration = $('.registration');
const $modal = $('#modal');
const $cancel = $('#modal #cancel');
const $nextButton = $('#next').hide();

$cancel.on('click', function() {
    $modal.slideUp();
    $modal.css(
        {
            "display": "none"
        }
    );
});

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
            $nextButton.attr('disabled', 'disabled');
            $nextButton.css({"background-color": "gray"});
            currentSection.fadeIn('slow');
        } else if (currentSection.attr('class') === 'activities') {
            currentSection.fadeOut('slow');
            currentSection = currentSection.next();
            $nextButton.hide();
            $('button[id="submit"]').show();
            currentSection.fadeIn('slow');           
        } 
    });
}//end showForm
});

let checkBoxes = $('.activities input[type="checkbox"');           
//if a box is checked
checkBoxes.on('change', function(e) {
    let $nextButton = $('#next');

    //if nothing is checked, the button is disabled
    if ($('.activities input:checkbox:checked').length === 0) {
        $nextButton.attr('disabled', 'disabled');
        $nextButton.css({"background-color": "gray"});
    } else {
        $nextButton.removeAttr('disabled');
        $nextButton.css({"background-color" : "#22627e"});
    }



});

