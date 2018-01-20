const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.route('/')
	.get((req,res)=>{
		res.redirect('/home/0')
	})

router.route('/search')
	.get((req,res)=>{
		res.render('search.ejs')
	})

router.route('/:id')
	.get((req,res)=>{
		res.render('home.ejs',{
			page: req.params.id,
			username: req.session.username
		})
	})


module.exports = router;