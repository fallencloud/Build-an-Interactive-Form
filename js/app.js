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
    let activity = $('#form-body .activities input[type="checkbox"]:checked');
    
    if (activity) {
        isValid = true;
        activities.classList.remove('error');
    } else  {
        activities.classList.add('error');
        isValid = false;    
    }

    console.log(isValid);
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