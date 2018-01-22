const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Homes = require('../models/homes.js');

router.route('/')
	.get((req,res)=>{
		res.render('home.ejs',{signedIn: req.session.loggedIn})
	})
	.post((req,res)=>{
		Homes.find({$and:[{neighborhood: req.body.neighborhood},{bedrooms: { $gte: req.body.min }},{bedrooms: { $lte: req.body.max }}]},(err,foundHomes) => {
			console.log(foundHomes);
		});
	})

router.route('/:id')
	.get((req,res)=>{
		res.render('home.ejs',{
			page: req.params.id,
			username: req.session.username
		})
	})


module.exports = router;