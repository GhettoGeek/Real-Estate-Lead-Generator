const 	express = require('express'), 
		app = express(),	
		bodyParser = require('body-parser'),
		session = require('express-session'),
		methodOverride = require('method-override'),
		port = 4100;

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
app.use('/', UserController);

const AgentController = require('./controllers/agentController.js');
app.use('/', AgentController);

const HomeController = require('./controllers/homeController.js');
app.use('/home/', HomeController);

app.get('*',(req,res)=>{
	res.status(404).send('404')
})

app.listen(port,()=>{
	console.log('listening on ' + port);
})