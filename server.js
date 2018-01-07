const express = require('express');
const hbs = require('hbs')
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+"/views/partials")
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper("makeItLoud",(text)=>{
  return text.toUpperCase();
})

app.set('view engine','hbs');



app.use((req, res, next)=>{
  var now = new Date().toString()
  var log=(`${now} ${req.method} ${req.url}`)
  console.log(log)
  fs.appendFile('server.log',log+"\n",(err)=>{
    if(err){
      console.log("error")
    }
  });
  next();
});

app.use((req,res,next)=>{

  res.render("warn.hbs",{
    pageContent:"This is a warning content",
  })
})

app.use(express.static(__dirname + "/public"))


app.get('/',(req,res) => {
  res.render("home.hbs",{
    pageTitle:"Home Page",
    pageContent:"This is a content",
  })
});

app.get('/about',(req,res)=>{
  res.render("about.hbs",{
    pageTitle:"About Page",
  })
})

app.get("/bad",(request,response)=>{
  response.send({
      code:400,
      failed:["database","Connection"],
      obj:{
        'name':"hi"
      }
  });
})




app.listen(port,()=>{
  console.log(`Server is running ${port}`);
});
