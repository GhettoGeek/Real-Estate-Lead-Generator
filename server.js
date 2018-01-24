const 	express = require('express'); 
const	app = express();	
const	bodyParser = require('body-parser');
const	session = require('express-session');
const	methodOverride = require('method-override');
const	port = 4100;

// db
require('./db/db.js')
// middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: "This is the secret",
	resave: false,
	saveUninitialized: false
}))

// controllers
const UserController = require('./controllers/userController.js');
app.use('/user/', UserController);

const HomeController = require('./controllers/homeController.js');
app.use('/home/', HomeController);

app.get('/',(req,res)=>{
	res.redirect('/user/login');
})

app.get('*',(req,res)=>{
	res.status(404).send('404')
})

app.listen(port,()=>{
	console.log('listening on ' + port);
})