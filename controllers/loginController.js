module.exports = (req, res) => {
    if (req.method == 'GET') {
        res.render('login', { title: 'Login Page' })
    } else if (req.method == 'POST') {
        let valid = false;
        //validate input data

        let email = req.body.email;
        let password = req.body.password;

        console.log(email, password)

        if (valid) {
            let user = {
                'email': email,
                'password': password
            };
            fetch('http://localhost:8080/login', {
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