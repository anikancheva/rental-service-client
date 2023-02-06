let formElement = document.querySelector('form');
formElement.addEventListener('submit', validate);

function validate(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let username = formData.get('username').trim();
    let firstName = formData.get('firstName').trim();
    let lastName = formData.get('lastName').trim();
    let email = formData.get('email').trim();
    let phoneNo = formData.get('phoneNo').trim();
    let password = formData.get('password').trim();
    let confpass = formData.get('confpass').trim();


    let validUsername = true;
    let validFirst = true;
    let validLast = true;
    let validEmail = true;
    let validPhoneNo = true;
    let validPass = true;

    if (username.length < 8 || username.length > 20) {
        document.getElementById('username').style.borderColor = 'red';
        document.getElementById('username-error').hidden = false;
        validUsername = false;
    } else {
        document.getElementById('username').style.borderColor = '';
        document.getElementById('username-error').hidden = true;
        validUsername = true;
    }

    if (firstName.length == 0) {
        document.getElementById('firstName').style.borderColor = 'red';
        validFirst = false;
    } else {
        document.getElementById('firstName').style.borderColor = '';
        validFirst = true;
    }

    if (lastName.length == 0) {
        document.getElementById('lastName').style.borderColor = 'red';
        validLast = false;
    } else {
        document.getElementById('lastName').style.borderColor = '';
        validLast = true;
    }

    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) == null) {
        document.getElementById('email').style.borderColor = 'red';
        validEmail = false;
    } else {
        document.getElementById('email').style.borderColor = '';
        validEmail = true;
    }

    if (phoneNo.match(/^\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/) == null) {
        document.getElementById('phoneNo').style.borderColor = 'red';
        validPhoneNo = false;
    } else {
        document.getElementById('phoneNo').style.borderColor = '';
        validPhoneNo = true;
    }

    if (password.length == 0 || password !== confpass) {
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('confpass').style.borderColor = 'red';
        validPass = false;
    } else {
        document.getElementById('password').style.borderColor = '';
        document.getElementById('confpass').style.borderColor = '';
        validPass = true;
    }


    if (validUsername && validFirst && validLast && validEmail && validPhoneNo && validPass) {
        formElement.removeEventListener('submit', validate);
        formElement.submit();
    } else {
        document.querySelector('.user-error').hidden = false;
    }



}