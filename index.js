import express from "express";
const app = express();
const Port = 3000;

app.use(express.static('public'));

app.get('/' , (req,res)=>{
    res.render("index.ejs");
});

app.get('/services' , (req,res)=>{
    res.render("services.ejs");
});

app.get('/plans' , (req,res)=>{
    res.render("plans.ejs");
});

app.get('/team' , (req,res)=>{
    res.render("team.ejs");
});


app.listen(Port, ()=>{
    console.log(`Server running on port ${Port}`);
});