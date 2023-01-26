const express = require('express')
const bodyParser=require('body-parser')
var app=express();
const port = 3000
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");

const trySchema=new mongoose.Schema({
   name:String
});

const item=mongoose.model("task",trySchema);
// const todo=new item({
//    name:"Create some videos"
// })

// const todo1=new item({
//    name:"Go and run"
// })
// const todo2=new item({
//    name:"wakeup early"
// })
// const todo3=new item({
//    name:"learn new techs"
// })
// const todo4=new item({
//    name:"enjoy as much as u can"
// })


// // todo1.save();
// // todo2.save();
// // todo3.save();
// // todo4.save();


app.get('/',function(req,res){
   item.find({},function(err,foundItems){
      if(err){
         console.log(err);
      }else{
       res.render("list",{ejes:foundItems});
      }
   })

})

app.post("/",function(req,res){
   const itemname=req.body.ele1;
    const todo4=new item({
      name:itemname
    });
    todo4.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
   const checked=req.body.checkbox1;
   item.findByIdAndRemove(checked,function(err){
      if(!err){
         console.log("deleted!");
         res.redirect("/");
      }
   })
})


app.listen(port,function(){
        console.log("server started")
})