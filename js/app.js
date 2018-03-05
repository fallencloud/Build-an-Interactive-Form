//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
const titleList = document.getElementById('title');
const designList = document.getElementById('design');
const colorList = document.getElementById('color');
const activities = document.querySelector('.activities');
let price = 0;
const payment = document.getElementById('payment');
const form = document.querySelector('form');



function hidePayement(paymentType) {
  const payPal = document.getElementById('paypal');
  const bitcoin = document.getElementById('bitcoin');
  const creditCard = document.getElementById('credit-card');

  if (paymentType === 'credit card') {
    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
    creditCard.style.display = 'block';
  } else if (paymentType === 'paypal') {
    creditCard.style.display = 'none';
    bitcoin.style.display = 'none';
    payPal.style.display = 'block';
  } else {
    creditCard.style.display = 'none';
    payPal.style.display = 'none';
    bitcoin.style.display = 'block';
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
    const labelsList = document.querySelectorAll('.activities label');
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
    const labelsList = document.querySelectorAll('.activities label');
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

function jobRole(titleList) {
    //create text field
    const otherTitle = document.createElement('input');
    //give it type text
    otherTitle.type = 'text';
    //give it an id of otherTitle
    otherTitle.id = 'other-title';
    //give it the placeholder text of 'Your Job Role'
    otherTitle.placeholder = 'Your Job Role';
    const fieldSet = titleList.parentNode;
    fieldSet.appendChild(otherTitle);
}

function chooseColors(shirtValue, colorList) {
    function hideAllColors() {
        for (let i = 0; i < colorList.length; i++) {
            colorList[i].style.display = 'none';
        }
    }

    // function showAllColors() {
    //     for (let i = 0; i < colorList.length; i++) {
    //         colorList[i].style.display = 'block';
    //     }
    // }
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
    
    if(shirtValue === 'js puns') {
        showPunColors(); 
    } else {
        showHeartColors();
    }


}

function validateForm() {
  let isValid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('mail');
  const activity = document.querySelectorAll('.activities input[type="checkbox"]');
  const paymentInfo = document.querySelector('#payment option[value="credit card"]').selected;
  let activityChecked = false;
  
  console.log(activity);
  
  //name cannot be blank
  if (name.value < 1) {
    name.className = 'error';
    name.placeholder = 'A name is required';
    isValid = false;
  } else {
    name.className = '';
  }

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
  }

  function checkActivities(activityChecked) {
    //at least one activity must be selected
    for (let i = 0; i < activity.length; i++){
      if (activity[i].checked === true) {
        activityChecked = true;
        console.log(activityChecked);
      }    
    }

    if (activityChecked === false) {
      activities.className = 'error';
      isValid = false;
    } else {
      activities.className = '';
    }
  }
  checkActivities(activityChecked);
}

titleList.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        jobRole(titleList);
    }
});

designList.addEventListener('change', (e) => {
    const shirtValue = e.target.value;
    chooseColors(shirtValue, colorList);
});

activities.addEventListener('change', (e) => {
    let label = e.target.parentNode.textContent;
    let legend = document.getElementById('cost');
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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();
});