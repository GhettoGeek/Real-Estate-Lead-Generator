const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.route('/')
	.get((req,res)=>{
		res.send('works')
	})

module.exports  = router;