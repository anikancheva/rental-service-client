const router = require("express").Router();

router.get('/:listing/like/:id', (req, res) => {
    let token=req.header('Cookie').split(' ')[1].substring(10);
    fetch(`http://localhost:8080/reviews/like/${req.params.id}`, {
        headers: {'Authorization': `Bearer: ${token}`}
    })
        .then(resp => {
            if (resp.status==200) {
                res.redirect(`/listings/details/${req.params.listing}`)
            } else {
                res.redirect('/listings')
            }
        })
});

router.get('/:listing/dislike/:id', (req, res) => {
    let token=req.header('Cookie').split(' ')[1].substring(10);
    fetch(`http://localhost:8080/reviews/dislike/${req.params.id}`, {
        headers: {'Authorization': `Bearer: ${token}`}
    })
        .then(resp => {
            if (resp.status==200) {
                res.redirect(`/listings/details/${req.params.listing}`)
            } else {
                res.redirect('/listings')
                console.log(resp)
            }
        })
});

module.exports = router;