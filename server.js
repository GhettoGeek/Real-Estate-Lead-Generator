const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// db
require('./db/db.js')
// middleware
app.use(bodyParser.urlencoded({extended: false}));
// controllers
const UserController = require('./controllers/UserController.js');
app.use('/user', UserController);

app.get('*',(req,res)=>{
	res.status(404).send('404')
})

app.listen(4100,()=>{
	console.log('listening on 4100');
})