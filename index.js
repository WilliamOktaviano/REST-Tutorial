const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const morgan = require('morgan')
//const jwt = require('jsonwebtoken')
//const bcrpyt = require('bcrypt-js')
//const config = require('../rest/config')
//const router = express.Router()
//const vhost = require('vhost')
const app = express()
const port = process.env.port || 8080;

/*const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyA4Sg9YFPACS4di3K82w-_3TxzUINDBQ6k'
  });

googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
  .asPromise()
  .then((response) => {
    console.log(response.json.results);
  })
  .catch((err) => {
    console.log(err);
  });
*/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var db = mysql.createConnection({
    host: '193.68.114.52',
    user: 'root',
    password: 'kendja16bc',
    database: 'iservices',  
    port: 3306
});

db.connect(function(err) {
   if(err) throw(err);   
   console.log("Connected"); 
});

app.get('/', (req, res, next) =>{
    res.send("Database Connected!");    
});

app.get("/member", (req, res, next)=>{
    let sql ="SELECT member_code, member_name, member_email, total_reward_amount FROM tblmember";
    db.query(sql, (err, result)=>{
        if(err) throw(err);
        res.send(result);
    });
});

app.get("/member/:member_code", (req, res, next)=>{
    let member_code = req.params.member_code;
    if(!member_code)
        res.status(404).send('Member Code tidak terdaftar!');
    let sql ="SELECT member_code, member_name, member_email, total_reward_amount FROM tblmember WHERE member_code=?";
    db.query(sql, member_code, (err, result)=>{
        if(err) throw(err);
        res.send(JSON.stringify(result, null, '\t'));
    });
});

app.listen(port, () => console.log('Example app listening on port:', port))
module.exports=app;