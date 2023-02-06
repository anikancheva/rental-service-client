const express = require('express');
const handlebars = require('express-handlebars');

const { body } = require('express-validator');
const app = express();
const port = 3000;

const login = require('./controllers/loginController');
const register = require('./controllers/registerController');

//handlebars setup
app.engine('.hbs', handlebars.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

//middleware
app.use('/static', express.static('./static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
//registration form input validation
app.get('/', (req, res) => res.render('home', { title: 'Home Page' }));
app.all('/login', login);
app.get('/register', register.get);
app.post('/register',
    body('username').notEmpty().withMessage("Username empty").isLength({ min: 8, max: 20 }).withMessage("Invalid username length"),
    body('firstName').notEmpty().withMessage("Invalid first name"),
    body('lastName').notEmpty().withMessage("Invalid last name"),
    body('email').isEmail().withMessage("Invalid email"),
    body('phoneNo').isMobilePhone().withMessage("Invalid phone number"),
    body('password').notEmpty().withMessage("Password empty"), register.post)


app.listen(port, () => console.log(`Server is listening on port ${port}`));