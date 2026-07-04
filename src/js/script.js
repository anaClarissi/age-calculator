/*==========================*/
/*       ERRORS OBJECT      */
/*==========================*/

const errors = {
    empty: "This field is required",
    invalid: {
        day: "Must be a valid day",
        month: "Must be a valid month",
        year: "Must be a valid year"
    },
    form: "Must be a valid date",
};



/*==========================*/
/*    FORM EVENT SUBMIT     */
/*==========================*/

const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {

    event.preventDefault();


    const year = document.querySelector("#year");
    
    const day = document.querySelector("#day");
    
    const month = document.querySelector("#month");


    const isYearValid = checkYear(year);
    
    const isMonthValid = checkMonth(month);
    
    const isDayValid = checkDay(day);
    
    if (isYearValid && isMonthValid && isDayValid) {

        const isFullDateValid = checkFullDate(year, month, day);

        if (isFullDateValid) showResult(year, month, day);

    }


});




/*==========================*/
/*     INPUT EVENT CLICK    */
/*==========================*/

const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach(input => {

    input.addEventListener("input", () => hiddenError(input));

});




/*==========================*/
/*         FUNCTIONS        */
/*==========================*/

function showResult(year, month, day) {

    const currentDate = new Date();

    const birthdayDate = new Date(year.value, month.value, day.value);


    let yearsDate = currentDate.getFullYear() - birthdayDate.getFullYear();

    let monthsDate = currentDate.getMonth() - birthdayDate.getMonth();

    let daysDate = currentDate.getDate() - birthdayDate.getDate();

    if (monthsDate < 0 || (monthsDate === 0 && daysDate < 0)) {

        yearsDate--;

        monthsDate = monthsDate < 0 ? monthsDate + 12 : monthsDate;

    }

    if (daysDate < 0) {

        const antecessorMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

        daysDate = antecessorMonth.getDate() + daysDate;

    }


    const resultYear = document.querySelector(".result-years");

    const resultMonth = document.querySelector(".result-months");

    const resultDay = document.querySelector(".result-days");


    resultYear.textContent = yearsDate;

    resultMonth.textContent = monthsDate;

    resultDay.textContent = daysDate;

}   

function checkFullDate(year, month, day) {

    year = Number(year.value);

    month = Number(month.value);

    day = Number(day.value);

    const date = new Date(year, month - 1, day);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== (month - 1) ||
        date.getDate() !== day
    ) {

        showErrorForm();
        
        return false;
        
    }

    if (date > today) {

        showErrorForm();

        return false;

    }
    
    return true;

}

function checkDay(day) {

    if (isEmpty(day)) {

        showError(day, errors.empty);

        return false;

    }

    if (!Number.isInteger(Number(day.value)) || day.value > 31 || day.value < 1) {

        showError(day, errors.invalid.day);

        return false;

    }

    return true;

}

function checkMonth(month) {

    if(isEmpty(month)) {

        showError(month, errors.empty);

        return false;

    }

    if (!Number.isInteger(Number(month.value)) || month.value > 12 || month.value < 1) {

        showError(month, errors.invalid.month);

        return false;

    }

    return true;

}

function checkYear(year) {

    const currentYear = new Date().getFullYear();

    if (isEmpty(year)) {

        showError(year, errors.empty);

        return false;

    }

    const digits = String(year.value).length;

    if (!Number.isInteger(Number(year.value)) || year.value > currentYear || year.value < 1 || digits > 4) {

        showError(year, errors.invalid.year);

        return false;

    }

    return true;

}

function isEmpty(input) {

    return input.value === "";

}

function showError(input, errorText) {

    hiddenError(input);

    const errorMessage = document.querySelector(`#${input.id}-error-message`);

    errorMessage.textContent = errorText;

    errorMessage.hidden = false;

    input.classList.add("error");

}

function showErrorForm() {

    const errorMessage = document.querySelector("#day-error-message");

    errorMessage.textContent = errors.form;

    errorMessage.hidden = false;

    form.classList.add("error");

}

function hiddenError(input) {

    const errorMessage = document.querySelector(`#${input.id}-error-message`);

    errorMessage.textContent = "";

    errorMessage.hidden = true;

    input.classList.remove("error");

    form.classList.remove("error");

}