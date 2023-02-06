let formElement = document.querySelector('form');
formElement.addEventListener('submit', validate);

function validate(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let username = formData.get('username').trim();
    let password = formData.get('password').trim();

    let validName = true;
    let validPass = true;

    if (username.length == 0) {
        document.getElementById('username').style.borderColor = 'red';
        validName = false;
    } else {
        document.getElementById('username').style.borderColor='';
        validName = true;
    }

    if (password.length == 0) {
        document.getElementById('password').style.borderColor = 'red';
        validPass=false;
    }else{
        document.getElementById('password').style.borderColor='';
        validPass=true;
    }

    if (validName && validPass) {
        formElement.removeEventListener('submit', validate);
        formElement.submit();
    }else {
        document.querySelector('.user-error').hidden = false;
    }



}