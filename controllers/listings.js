const router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'static/images/',
    filename: (req, file, nameGen) => {
        let ext = file.mimetype.split('image/')[1];
        nameGen(null, file.fieldname + '-' + Math.round(Math.random() * 10000) + '.' + ext)
    }
});
const upload = multer({ storage });

router.get('/:type?', async (req, res) => {
    let token = req.header('Cookie').split(' ')[1];;
    if (!token) {
        res.render('login');
    } else {
        let ctx = {
            title: 'Listings',
            listings: await getAllListings(req.params.type, token.substring(10))
        }
        res.render('listings', ctx);
    }


})

router.get('/details/:id', async (req, res) => {
    let token = req.header('Cookie').split(' ')[1];;
    if (!token) {
        res.render('login');
    } else {
        let ctx = {
            title: 'Listings',
            listingDetails: await getOneListing(req.params.id, token.substring(10))
        }
        res.render('listings', ctx);
    }


})

router.post('/', upload.single('image'), create)

module.exports = router;

async function getAllListings(type, token) {

    const resp = await fetch(`http://localhost:8080/listings/${type ? type : ''}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (resp.status == 200) {
        return resp.json();
    } else {
        console.log('Error in fetch All: ', resp.status);
        return;
    }
}

async function getOneListing(id, token) {

    const resp = await fetch(`http://localhost:8080/listings/details/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (resp.status == 200) {
        return resp.json();
    } else {
        console.log('Error in fetch One: ', resp.status);
        return;
    }
}

async function create(req, res) {
    let { type, brand, model, year, seats, doors, price } = req.body;

    let picUrl = req.file ? req.file.path : undefined;

    brand = brand.trim();
    model = model.trim();

    if (brand.length < 3 || model.length < 2) {
        res.render('create', { error: 'Invalid brand or model!' })
    } else if (!picUrl) {
        res.render('create', { error: 'An image is required!' })
    } else {
        let token = req.header('Cookie').split(' ')[1].substring(10);
        let response = await fetch('http://localhost:8080/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ type, brand, model, year, seats, doors, price, picUrl })
        });

        if (response.ok == false) {
            res.render('create');
        } else {
            res.redirect('/listings');
        }
    }



}
