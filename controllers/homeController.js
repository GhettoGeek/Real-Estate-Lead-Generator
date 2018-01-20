const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.route('/')
	.get((req,res)=>{
		// res.redirect('/partial/0'); // Cool thing u can do
		res.render('home.ejs')
	})
	.post((req,res)=>{
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