const express 		= require('express'),
			app 				= express(),
			bodyParser  = require('body-parser'),
			http 				= require('http'),
			morgan 			= require('morgan'),
			mongoose 		= require('mongoose'),
			cors 				= require('cors'),
			router 			= require('./router')

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
	mongoose.connect('mongodb://localhost:auth/testing');
} else {
	mongoose.connect('mongodb://mrhubo:mrhubo161@ds121091.mlab.com:21091/authentication-mern')
}

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 6060;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);



