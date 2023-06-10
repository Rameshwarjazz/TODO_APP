const express = require('express');
const { write } = require('fs');

//require path for files
const path = require('path');

//define port number
const port = 5000;

//require database 
const db = require('./config/mongoose');
const Task = require('./models/task');
const app = express();

//setting ejs file (view engine)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.urlencoded());


//home page 
app.get('/',async function(req,res){
    const task = await Task.find();
     return res.render('home',{
            tittle: "Home",
            task: task
    })
});

//create task which gives by user
app.post('/create-task',async function(req,res){
    const task = await Task.create({
        description: req.body.description,
            category: req.body.category,
            date: req.body.date
    });
    return res.redirect('back');
    });

//delete task if need
app.get('/delete-task', async function(req, res){
    const id = req.query;

    const count = Object.keys(id).length;
    try {
        for(let i=0; i < count ; i++){
            await Task.findByIdAndDelete(Object.keys(id)[i]);
        }
        return res.redirect('back');
    } catch (err) {
        console.log('error in deleting task', err);
        return res.status(500).send('Internal server error');
    }
});
        
//server starting 
app.listen(port, (err)=>{
    if(err){
     console.log('Pappu! Error.',err);
    }
    console.log('Hurrahh! Port is working:',port);
});