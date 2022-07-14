const express= require('express');
const app=express();
const bodyParser= require("body-parser");
const path=require('path');
const hbs=require("hbs");
const con = require('./dbService');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,"/views/partials"));

app.get('/eta-etd', function(req,res){
    res.render('eta-etd');
});

app.get('/livestatus', function(req,res){
    res.render('livestatus');
});

// app.post('/livestatus/query', function(req,res){
//     console.log(req)
//     const train_id = req.body.train_id;
//     const time = req.body.time;
//     const query = "select * from timetable where arrival_time>? and train_id=? order by arrival_time Limit 1;";

//     con.query(query,[time,train_id], function (err, result) {
//         if (err) throw err;
//         console.log(result)
//         // res.render('mit-livestatus', {"schedule": result})
//         console.log(result.length)
//         if (result.length == 0){
//             res.render('livestatus');}
//         res.render('mit-eta-etd',{
//             "schedule":result
//         });
        
//     })
//     //console.log(location, train_id)
//     //res.render('eta-etd',{
//     //    "schedule":result
//     //});
// });
app.post('/livestatus/query', function(req,res){
    console.log(req)
    const train_id = req.body.train_id;
    const time = req.body.time;
    const query = "select *,s.station_name from timetable tt inner join station s inner join train t where s.station_id=tt.station_id and t.train_id=tt.train_id and (? between arrival_time and departure_time) and (tt.train_id=? or t.train_name=?)";
    var check=0
    var result2
    const delay = ms => new Promise(res => setTimeout(res, ms));
    con.query(query,[time,train_id,train_id], async function (err, result) {
        if (err) throw err;
        console.log(result)
        console.log(query)
        // res.render('mit-eta-etd', {"schedule": result})
        console.log(result.length)
        if (result.length == 0){
            const query1="(select * from timetable tt inner join station s where s.station_id=tt.station_id and departure_time<? and train_id=? order by arrival_time DESC Limit 1) union (select * from timetable tt inner join station s where s.station_id=tt.station_id and arrival_time>? and train_id=? order by arrival_time Limit 1)"
            console.log("New RESULT------");

            con.query(query1,[time,train_id,time,train_id], (err1,result1)=>{
                console.log("This is res1")
                console.log(result1)
                result2=result1;
            })
            check=1
        }
        
        await delay(4000);
        console.log("Result 2 is--");
        console.log(result2);
        if(result.length==0)            
        res.render('mit-livestatus',{
            "schedule":result2
        });
        else
        res.render('mit-livestatus',{
            "schedule":result
        });
        
    })
    //console.log(location, train_id)
    //res.render('eta-etd',{
    //    "schedule":result
    //});
});
app.post('/eta-etd/query', function(req,res){
    console.log(req)
    const train_id = req.body.train_id;
    const location = req.body.location;
    const query = "Select tt.timetable_id,s.station_name,tt.arrival_time,tt.departure_time from timetable as tt inner join station as s where tt.train_id=? and s.station_name=? and tt.station_id=s.station_id";

    con.query(query,[train_id,location], function (err, result) {
        if (err) throw err;
        console.log(result)
        // res.render('mit-eta-etd', {"schedule": result})
        console.log(result.length)
        if (result.length == 0){
            res.render('eta-etd');}
        res.render('mit-eta-etd',{
            "schedule":result
        });
        
    })
    //console.log(location, train_id)
    //res.render('eta-etd',{
    //    "schedule":result
    //});
});




app.get('/', function(req,res){
    res.render('login');
});

app.post('/login', function (req,res) {
    const username=req.body.name;
    const password=req.body.password;
    const query="select* from admin where username=? and binary password=?";
    
    con.query(query,[username,password], function (err,result) {
        if(err) throw err;
        if(result.length==0)
        {
            res.render('login',{
                error:true
            });
        }
        else
            res.redirect('/trains');

    });
});


app.use('/trains', require('./routes/trains'));
app.use('/stations', require('./routes/stations'));
app.use('/routes', require('./routes/routes'));
app.use('/employees', require('./routes/employees'));
app.use('/timetable', require('./routes/timetable'));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!')
  })

app.listen(8080, function(){
    console.log("Web Application is running");
});