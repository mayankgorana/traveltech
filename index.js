import express from "express";
const app = express();
const Port = 3000;

app.use(express.static('public'));

app.get('/' , (req,res)=>{
    res.render("index.ejs")
})