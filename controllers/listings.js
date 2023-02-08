const router = require('express').Router();

router.get('/:type?', async (req, res) => {
    let ctx = {
        title: 'Listings',
        listings: await getListings(req.params.type)
    }
    res.render('listings', ctx);

})


module.exports = router;

async function getListings(type) {

    const resp = await fetch(`http://localhost:8080/listings/${type ? type : ''}`);
    if (resp.status == 200) {
        return resp.json();
    } else {
        console.log('Error: ', resp.status);
        return;
    }
}