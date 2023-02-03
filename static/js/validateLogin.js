let formElement = document.querySelector('form');
formElement.addEventListener('submit', validate);

function validate(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let username = formData.get('username').trim();
    let password = formData.get('password').trim();


    if (username.length == 0 || password.length == 0) {
        document.querySelector(".user-error").hidden = false;
    } else {
        formElement.removeEventListener('submit', validate);
        formElement.submit();
    }



}