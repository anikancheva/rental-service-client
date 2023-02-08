const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const { body } = require('express-validator');
const app = express();
const port = 3000;

const login = require('./controllers/login');
const register = require('./controllers/register');
const listingsRouter = require('./controllers/listings');

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
app.get('/', (req, res) => res.render('home', { title: 'Home Page' }));
app.get('/about', (req, res) => res.render('about', { title: 'About' }));
app.use('/listings', listingsRouter);
app.get('/create', (req, res) => res.render('create', { title: 'Create Listing' }));
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
    res.render('home', { title: 'Home' })
})


app.listen(port, () => console.log(`Server is listening on port ${port}`));