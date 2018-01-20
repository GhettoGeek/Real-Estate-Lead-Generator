const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

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