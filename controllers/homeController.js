const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Homes = require('../models/homes.js');
const Request = require('../models/requestModel.js');

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
		Homes.findById(req.params.id,(err,foundHome)=>{
			res.render('show.ejs',{
				home: foundHome,
				signedIn: req.session.loggedIn
			})
		})
	})
	.post((req,res)=>{
		// Find the user who requested the showing
		User.findOne({email: req.session.email}, (err,found)=>{
			// Create a request to view the home
			const showingRequest = {
				propertyId: req.params.id,
				userId: found.id,
				created: new Date(),
				accepted: false,
				completed: false
			}
			Request.create(showingRequest,(err,created)=>{
				// Push the created request into the users list of requests
				found.requestedProperties.push(created);
				// Save the changed user
				found.save((err)=>{if (err) return handleError(err)});
			})
		})
	})

module.exports = router;