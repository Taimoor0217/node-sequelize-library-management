const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const sequelize = require('./dbConfig')

app.use(express.json());
app.set('views' , path.join(__dirname , 'views'));
app.set(`view engine` , 'pug')
app.use(express.static(__dirname + '/public'));
  
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  
  
  app.get('/ping' , (req , res)=>{
    res.send("pong")
  })

  app.get('/' , (req , res)=>{
    res.render("all_books")
  })

  app.get('/details' , (req , res)=>{
    res.render("book_detail")
  })

  app.get('/new' , (req , res)=>{
    res.render("new_book")
  })

  app.get('/*' , (req , res)=>{
    res.render("error")
  })

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}!`);
  });
  // Rather than hardcoding any information inside the pug templates I have added all the information here and then I used this JSON to populate the
  // pug varaibles in the templates. I also had to slightly modify the pug templtaes for this.
  //Similarly, to changes any images, one can simply replace the relevant images in the images folder.