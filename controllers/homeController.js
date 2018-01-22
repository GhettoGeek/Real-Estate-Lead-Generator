const	express = require('express'),
		router = express.Router(),
		User = require('../models/userModel.js');
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
router.route('/profile/:id')
	.post((req,res)=>{
		console.log('POST WORKS')
		// Homes.findById(req.params.id, (err,foundHome)=>{
		// 	console.log(foundHome)
		// })
	})
	
router.route('/:id')
	.get((req,res)=>{
		// console.log(req.params.id)
		Homes.findById(req.params.id,(err,foundHome)=>{
			res.render('show.ejs',{
				home: foundHome
			// username: req.session.username
			})
		})
	})



module.exports = router;