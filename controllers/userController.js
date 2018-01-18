const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

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
		const password = req.body.password;
		const hashword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const newDbEntry = {
			username: req.body.username,
			password: hashword
		}

		User.create(newDbEntry, (err,created)=>{
			if (err){
				res.send(err)
			} else {
				res.send(created);
			}
		})
	})

module.exports  = router;