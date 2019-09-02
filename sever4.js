let express = require("express");
let app = express();
let bodyParser = require('body-parser');
let mongodb = require('mongodb')
let mongoClient = mongodb.mongoClient
const url = 'mongodb://localhost:27017/'

MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db('fi2095tabe');
    }
});
let showView = __dirname + "/views/";
let db = [];
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static('images'))
app.use(express.static('css'))

app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', function(req,res){
    res.sendFile(showView + 'LabWeek4.html')
})
app.get('/addNewTask',function(req,res){
    res.sendFile(showView + 'newTasks.html')
})
app.post('/data', function(req,res){
    console.log(req.body);
    db.push(req.body);
})
app.get('/listTasks',function(req,res){
    res.render('listTasks.html',{
        
        stuDb:db,
        customer:"student",
    });
})



app.listen(2100);
console.log("Sever is running at http://localhost:2100");