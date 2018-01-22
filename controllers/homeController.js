const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Homes = require('../models/homes.js');

router.route('/')
	.get((req,res)=>{
		res.render('home.ejs',{signedIn: req.session.loggedIn})
	})
	.post((req,res)=>{
		// Finds all the homes that match the users options
		Homes.find({$and:[{neighborhood: req.body.neighborhood},{bedrooms: { $gte: req.body.min }},{bedrooms: { $lte: req.body.max }}]},(err,foundHomes) => {
			// Render a page showing all the found homes for the user
			res.render('showmany.ejs',{
				homes: foundHomes,
				signedIn: req.session.loggedIn
			})
		})
	})

router.route('/:id')
	.get((req,res)=>{
		// res.render('home.ejs',{
		// 	page: req.params.id,
		// 	username: req.session.username
		// })
		res.send('working')
	})


module.exports = router;