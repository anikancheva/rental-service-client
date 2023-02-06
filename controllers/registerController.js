const { validationResult } = require('express-validator');

module.exports = {
    get: (req, res) => {
        res.render('register', { title: 'Register Page' })
    },

    post: (req, res) => {
        let errors = validationResult(req).array();
        if (errors.length > 0 || req.body.password != req.body.confpass) {
            console.log(errors)
            res.render('register', { error: 'Invalid input' })
        } else {
            let user = {
                'username': req.body.username,
                'firstName': req.body.firstName,
                'lastName': req.body.lastName,
                'email': req.body.email,
                'phoneNo': req.body.phoneNo,
                'password': req.body.password
            };

            let jwt;
            let err = false;
            fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(user)
            }).then(resp => {
                if (resp.status != 200) {
                    err = true;
                }
                return resp.text();

            }).then(data => {
                if (err) {
                    res.render('register', { error: data });
                } else {
                    jwt = data;
                    res.cookie('sessionId', jwt, { httpOnly: true })
                    res.render('home', { title: 'Home', user: user.username })
                }
            })
        }
    }
}
