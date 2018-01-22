const	express = require('express'),
		router = express.Router(),
		User = require('../models/userModel.js');

router.route('/')
	.get((req,res)=>{
		res.render('home.ejs',{signedIn: req.session.loggedIn})
	})
	.post((req,res)=>{ // Query

		console.log(req.body)
	})

router.route('/:id')
	.get((req,res)=>{
		res.render('home.ejs',{
			page: req.params.id,
			username: req.session.username
		})
	})


module.exports = router;