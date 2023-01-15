module.exports = (req, res) => {
    if (req.method == 'GET') {
        res.render('register', { title: 'Register Page' })
    } else if (req.method == 'POST') {
        let valid = false;
        //validate input data

        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let confpass = req.body.confpass;

        console.log(username, email, password, confpass)

        if (valid) {
            let user = {
                'username': username,
                'email': email,
                'password': password
            };
            fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: 'Content-type: application/json',
                body: user.json()
            })
                .then(resp => {
                    if (resp.status == 201) {
                        res.render('home', { title: 'Home' })
                    } else {
                        console.log(resp.status)
                    }
                })
        }


    }
}