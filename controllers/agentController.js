const 	express = require('express'),
		router = express.Router(),
		User = require('../models/userModel.js'),
		Agent = require('../models/agentModel.js'),
		bcrypt = require('bcrypt');



router.route('/logout')
	.get((req,res)=>{
		req.session.destroy((err)=>{
			if (err){
				console.log('broke');
			} else {
				res.redirect('login');
			}
		})
	})

router.route('/agent/register')
	.get((req,res)=>{
		res.render('agentRegister.ejs',{message: false}) // Add option to see if user is already registered)
	})
	.post((req,res)=>{
		//add agent to db and redirect to home
		const password = req.body.password;
		const hashword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const newDbEntry = {
			fullname: req.body.fullname,
			email: req.body.email,
			mlsid: req.body.mlsid,
			password: hashword
		}

		Agent.create(newDbEntry, (err,created)=>{
			if (err){
				res.render('agentRegister.ejs',{message: true});
			} else {
				res.redirect('/login');
			}
		})
	})

module.exports  = router;



//// old login for reference 

// router.route('/login')
// 	.get((req,res)=>{
// 		res.render('login.ejs', {
// 			message: req.session.message
// 		})
// 	})
// 	.post((req,res)=>{
// 		Agent.findOne({email: req.body.email}, (err,userFound)=>{
// 			if (userFound){
// 				//compare passwords
// 				if (bcrypt.compareSync(req.body.password, userFound.password)) {
// 					req.session.email = req.body.email;
// 					req.session.loggedIn = true;

// 					if (req.session.message){
// 						delete req.session.message
// 					}
// 					res.redirect('/home')
// 				} else { // passwords didnt match
// 					req.session.message = "Incorrect email or password";
// 					res.redirect('/login');
// 				}
// 			} else {
// 				req.session.message = "Incorrect email or password";
// 				res.redirect('/login');
// 			}
// 		})
// 	})


