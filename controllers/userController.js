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
		res.render('login.ejs', {
			message: req.session.message
		})
	})
	.post((req,res)=>{
		User.findOne({username: req.body.username}, (err,userFound)=>{
			if (userFound){
				//compare passwords
				if (bcrypt.compareSync(req.body.password, userFound.password)) {
					req.session.username = req.body.username;
					req.session.loggedIn = true;

					if (req.session.message){
						delete req.session.message
					}
					res.redirect('/home')
				} else { // passwords didnt match
					req.session.message = "Incorrect username or password";
					res.redirect('user/login');
				}
			} else {
				req.session.message = "Incorrect username or password";
				res.redirect('/user/login');
			}
		})
	})

router.route('/logout')
	.get((req,res)=>{
		req.session.destroy((err)=>{
			if (err){
				console.log('broke');
			} else {
				res.redirect('/user/login');
			}
		})
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
				res.redirect('/user/login');
			}
		})
	})

module.exports  = router;