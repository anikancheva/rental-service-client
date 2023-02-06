module.exports = (req, res) => {
    if (req.method == 'GET') {
        res.render('login', { title: 'Login' })
    } else if (req.method == 'POST') {

        let username = req.body.username.trim();
        let password = req.body.password.trim();

        let jwt;
        if (username.length > 0 && password.length > 0) {
            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ username, password })
            }).then(resp => {
                if (resp.status != 200) {
                    res.render('login', { error: true })
                } else {
                    return resp.text();
                }             
            }).then(data => {
                jwt = data;
                res.cookie('sessionId', jwt, { httpOnly: true })
                res.render('home', { title: 'Home', user: username })

            })

        } else {
            res.render('login', { error: true })
        }


    }
}