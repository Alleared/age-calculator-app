

// ----------- INVALID DATE MESSAGES ----------- 
// SELECT THE LABELS
const dayLabel = document.querySelector('.js-day-label');
const monthLabel = document.querySelector('.js-month-label');
const yearLabel = document.querySelector('.js-year-label');

// SELECT INPUT FOR INVALID DATES
const dayInput = document.querySelector('.js-day-input');
const monthInput = document.querySelector('.js-month-input');
const yearInput = document.querySelector('.js-year-input');

// SELECT ERROR MESSAGES
const dayErrorMessage = document.querySelector('.js-day-error-message');
const monthErrorMessage = document.querySelector('.js-month-error-message');
const yearErrorMessage = document.querySelector('.js-year-error-message');


// SELECT THE INPUTS
const inputDay = document.getElementById('day-input');
const inputMonth = document.getElementById('month-input');
const inputYear = document.getElementById('year-input');


// SELECT THE RESULTS 
// Paragraph
const yearParagraph = document.querySelector('.js-result-year');
const monthParagraph = document.querySelector('.js-result-month');
const dayParagraph = document.querySelector('.js-result-day');


// Span Result 
const fResultYear = document.querySelector('.js-fResult-year');
const fResultMonth = document.querySelector('.js-fResult-month');
const fResultDay = document.querySelector('.js-fResult-day');


// INPUT FILTER - ONLY ALLOW NUMBER IN THE TEXT INPUT
// Day filter input
setInputFilter(document.getElementById("day-input"), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
}, 'Only Numbers Allowed');

// Month filter input
setInputFilter(document.getElementById("month-input"), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
}, 'Only Numbers Allowed');

// Year filter input
setInputFilter(document.getElementById("year-input"), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
}, 'Only Numbers Allowed');

// INPUT FILTER FUNCTION
function setInputFilter(textbox, inputFilter, errMsg) {
  [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
    textbox.addEventListener(event, function(e) {
      if (inputFilter(this.value)) {
        // Accepted value.
        if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      }
      else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
      else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
}

// POSSIBLES ERROR MESSAGES
const errorMessages = [
  'This field is required',
  'Must be a valid day',
  'Must be a valid month',
  'Must be in the past'
];

// GET THE CURRENT DATE 
const currentDate = new Date();

let dd = currentDate.getDate();
let mm = currentDate.getMonth() + 1;
let yyyy = currentDate.getFullYear();

const lastDayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function finalResult () {
  
  // DAY CODE
  let date = inputDay.value;

  if (date === '') {
    dayLabel.classList.add('label-error');
    dayInput.classList.add('input-error');

    monthLabel.classList.add('label-error');
    monthInput.classList.add('input-error');

    yearLabel.classList.add('label-error');
    yearInput.classList.add('input-error');

    fResultDay.innerText = '--';
    fResultMonth.innerText = '--';
    fResultYear.innerText = '--';
    dayErrorMessage.innerText = errorMessages[0]

  } else if (date < 0 || date > 31) {
    dayLabel.classList.add('label-error');
    dayInput.classList.add('input-error');

    monthLabel.classList.add('label-error');
    monthInput.classList.add('input-error');

    yearLabel.classList.add('label-error');
    yearInput.classList.add('input-error');

    fResultDay.innerText = '--';
    fResultMonth.innerText = '--';
    fResultYear.innerText = '--';
    dayErrorMessage.innerText = errorMessages[1];
    
  } else {
    dayLabel.classList.remove('label-error');
    dayInput.classList.remove('input-error');

    monthLabel.classList.remove('label-error');
    monthInput.classList.remove('input-error');

    yearLabel.classList.remove('label-error');
    yearInput.classList.remove('input-error');

    dayErrorMessage.innerText = '';

    if (date > dd) {
      dd = dd + lastDayOfMonth[mm - 1];
      mm = mm - 1;
    }

    const dayTotal = dd - date;

    fResultDay.innerText = dayTotal;

  }
  
  // MONTH CODE
  let month = inputMonth.value;

  if (month === '') {

    dayLabel.classList.add('label-error');
    dayInput.classList.add('input-error');

    monthLabel.classList.add('label-error');
    monthInput.classList.add('input-error');

    yearLabel.classList.add('label-error');
    yearInput.classList.add('input-error');

    fResultDay.innerText = '--';
    fResultMonth.innerText = '--';
    fResultYear.innerText = '--';
    monthErrorMessage.innerText = errorMessages[0];
    
  } else if (month < 1 || month > 12) {

    dayLabel.classList.add('label-error');
    dayInput.classList.add('input-error');

    monthLabel.classList.add('label-error');
    monthInput.classList.add('input-error');

    yearLabel.classList.add('label-error');
    yearInput.classList.add('input-error');

    monthErrorMessage.innerText = errorMessages[2];
    fResultDay.innerText = '--';
    fResultMonth.innerText = '--';
    fResultYear.innerText = '--';
    
  } else {

    dayLabel.classList.remove('label-error');
    dayInput.classList.remove('input-error');

    monthLabel.classList.remove('label-error');
    monthInput.classList.remove('input-error');

    yearLabel.classList.remove('label-error');
    yearInput.classList.remove('input-error');

    monthErrorMessage.innerText = '';

    if (month > mm) {
      mm = mm + 12;
      yyyy = yyyy - 1;

    }

    let monthTotal = mm - month;

    fResultMonth.innerText = monthTotal;
    
  }

  // Year code
  let year = inputYear.value;
  if (year === '') {

    dayLabel.classList.add('label-error');
    dayInput.classList.add('input-error');

    monthLabel.classList.add('label-error');
    monthInput.classList.add('input-error');

    yearLabel.classList.add('label-error');
    yearInput.classList.add('input-error');


    yearErrorMessage.innerText = errorMessages[0];
    fResultDay.innerText = '--';
    fResultMonth.innerText = '--';
    fResultYear.innerText = '--';

  } else if (year > yyyy) {

    dayLabel.classList.add('label-error');
    dayInput.classList.add('input-error');

    monthLabel.classList.add('label-error');
    monthInput.classList.add('input-error');

    yearLabel.classList.add('label-error');
    yearInput.classList.add('input-error');

    yearErrorMessage.innerText = errorMessages[3];
    fResultDay.innerText = '--';
    fResultMonth.innerText = '--';
    fResultYear.innerText = '--';

  } else {

    dayLabel.classList.remove('label-error');
    dayInput.classList.remove('input-error');

    monthLabel.classList.remove('label-error');
    monthInput.classList.remove('input-error');

    yearLabel.classList.remove('label-error');
    yearInput.classList.remove('input-error');

    yearErrorMessage.innerText = '';

    const yearTotal = yyyy - year;
    fResultYear.innerText = yearTotal;

  }

}



// TEST CODE
function dateAgo (date) {
  let startDate = new Date(date);
  let diffDate = new Date(new Date() - startDate);
  
  return ((diffDate.toISOString().slice(0, 4) - 1970) + 'Y ' + 
    diffDate.getMonth() + "M " + (diffDate.getDate()-1) + "D");
}

console.log(dateAgo('1989 05 13'));

