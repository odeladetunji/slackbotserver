const app = require('express')();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


app.use(bodyParser.urlencoded({ extended: false })); // urlencoded form parser
app.use(bodyParser.json())  // json parser
app.use(cors());


server.listen(9000, function(){
	console.log('slack bot is listening');
});
