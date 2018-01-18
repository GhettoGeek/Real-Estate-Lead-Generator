const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.route('/')
	.get((req,res)=>{
		res.send('works')
	})

router.route('/login')
	.get((req,res)=>{
		res.render('login.ejs')
	})
	.post((req,res)=>{
		res.send(req.body);
	})

router.route('/register')
	.get((req,res)=>{
		res.render('register.ejs')
	})
	.post((req,res)=>{
		//add user to db and redirect to home
	})

module.exports  = router;