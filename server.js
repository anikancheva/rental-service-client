const express=require('express');
const handlebars=require('express-handlebars');
const app=express();
const port=3000;

const login=require('./controllers/loginController');
const register = require('./controllers/registerController');

//handlebars setup
app.engine('.hbs', handlebars.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

//middleware
app.use('/static', express.static('./static'));
app.use(express.urlencoded({extended: false}));

//routes
app.get('/', (req, res)=> res.render('home', {title: 'Home Page'}));
app.all('/login', login);
app.all('/register', register);


app.listen(port, ()=>console.log(`Server is listening on port ${port}`));