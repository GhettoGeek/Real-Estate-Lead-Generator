const express = require('express');
const app = express();

app.get('*',(req,res)=>{
	res.status(404).send('404')
})

app.listen(4100,()=>{
	console.log('listening on 4100');
})