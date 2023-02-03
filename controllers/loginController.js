module.exports = (req, res) => {
    if (req.method == 'GET') {
        res.render('login', { title: 'Login Page' })
    } else if (req.method == 'POST') {

        let username = req.body.username.trim();
        let password = req.body.password.trim();

        let jwt = "";
        if (username.length > 0 && password.length > 0) {
            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ username, password })
            }).then(resp => {
                if (resp.status == 200) {
                    res.render('home', { title: 'Home', user: username })
                    return resp.text();
                } else {
                    res.render('login', { error: true })
                }

            }).then(data => {
                console.log("token--->" + data)
                jwt = data;
            })

        } else {
            // error
        }


    }
}