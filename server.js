const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const { body } = require('express-validator');
const app = express();
const port = 3000;

const login = require('./controllers/login');
const register = require('./controllers/register');
const listingsRouter = require('./controllers/listings');
const reviewsRouter= require('./controllers/reviews');

//handlebars setup
app.engine('.hbs', handlebars.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

//middleware
app.use('**/static', express.static('./static'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

//routes
//registration form input validation
app.use((req, res, next) => {
    let token = req.header('Cookie').split(' ')[1];
    if (token) {
        req.user = true;
    }
    next();
});
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', user: req.user })
});
app.get('/about', (req, res) => res.render('about', { title: 'About', user: req.user  }));
app.use('/listings', listingsRouter);
app.get('/create', (req, res) => {
    if (!req.user) {
        res.render('login');
    } else {
        res.render('create', { title: 'Create Listing', user: req.user })
    }

});
app.use('/reviews', reviewsRouter)
app.all('/login', login);
app.get('/register', register.get);
app.post('/register',
    body('username').notEmpty().withMessage("Username empty").isLength({ min: 8, max: 20 }).withMessage("Invalid username length"),
    body('firstName').notEmpty().withMessage("Invalid first name"),
    body('lastName').notEmpty().withMessage("Invalid last name"),
    body('email').isEmail().withMessage("Invalid email"),
    body('phoneNo').isMobilePhone().withMessage("Invalid phone number"),
    body('password').notEmpty().withMessage("Password empty"), register.post);
app.get('/logout', (req, res) => {
    res.clearCookie('sessionId');
    req.user=undefined;
    res.render('home', { title: 'Home' })
})


app.listen(port, () => console.log(`Server is listening on port ${port}`));