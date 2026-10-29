// Project 1: write your form validation in this file.

// stores parts of the document into variables to avoid unnecessary searching
const form = document.querySelector('#signup-form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const frequencyField = document.querySelector('#frequency');
const formMessage = document.querySelector('#form-message');


// catches email mistakes, had to look the email pattern part up to figure it out
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function (event) {

    event.preventDefault();

    const nameValue = nameField.value.trim();
    const emailValue = emailField.value.trim();
    const frequencyValue = frequencyField.value; 

    let firstInvalid = null;

    // Name check, checks for if the field is empty
    if (nameValue === '') {

        showError(nameField, 'name-error', 'Enter your name.');

        if (!firstInvalid) firstInvalid = nameField;
    } else {
        clearError(nameField, 'name-error');
    }

    // email check, checks if it's empty, checks to see if it follows the pattern
    if (emailValue === '') {
        showError(emailField, 'email-error', 'Enter your email address.');
        if (!firstInvalid) firstInvalid = emailField;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailField, 'email-error', 'Enter an email address in the format: name@example.com.');
        if (!firstInvalid) firstInvalid = emailField;
    } else {
        clearError(emailField, 'email-error');
    }

    // checks the select dropdown 
    if (frequencyValue === '') {
        showError(frequencyField, 'frequency-error', 'How often should we email you?');
        if (!firstInvalid) firstInvalid = frequencyField;
    } else {
        clearError(frequencyField, 'frequency-error');
    }

// if firstInvalid is null then everything else passed 
  if (firstInvalid) {
        formMessage.textContent = '';
        formMessage.classList.remove('success');
        firstInvalid.focus();
    } else {
        formMessage.textContent = `Thank you, ${nameValue}! You're on the mailing list.`;
        formMessage.classList.add('success');
        form.reset();
    }

});

// Helps to show errors by putting the message text into the right place and marking the field as invalid
function showError(field, errorId, message) {
    field.setAttribute('aria-invalid', 'true');
    document.getElementById(errorId).textContent = message;
}

//  helps to clear errors after they've been fixed
function clearError(field, errorId) {
    field.removeAttribute('aria-invalid');
    document.getElementById(errorId).textContent = '';
}