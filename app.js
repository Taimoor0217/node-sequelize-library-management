const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const db = require('./dbConfig')
const Book = require('./models/book')
app.set('views' , path.join(__dirname , 'views'));
app.set(`view engine` , 'pug')
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  app.get('/books' , (req , res)=>{
    Book.findAll().then(data => {
        res.render("all_books" , {
            "books" : data
        })
    });  
  })
  app.get('/' , (req , res)=>{
      res.redirect('/books')
  })
  app.get('/books/new' , (req , res)=>{
    res.render("new_book" , {
      "error": false,
      "fields": []
    })
  })
  app.get('/books/:id' , (req , res)=>{
    book = Book.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(data=>{
      // console.log(data[0].dataValues)
      res.render("book_detail" , {
        ...data[0].dataValues,
        "error": false,
        "fields": []
      })
    })
    .catch(err=>{
      res.render("page_not_found")
    })
  })


  app.post('/books/new' , (req ,res)=>{
    let error = false;
    let missing = [];
    data = req.body
    if (!data.title){
      error = true
      missing.push("title")
    }
    if(!data.author){
      error = true
      missing.push("author")
    }
    if(error){
      res.render('new_book' , {
        "error": true,
        "fields": missing
      })
    }else{
      Book.
      create(data)
      .then(book=>{
        res.redirect('/')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  })


  app.post('/books/:id' , (req ,res)=>{
    let error = false;
    let missing = [];
    data = req.body
    if (!data.title){
      error = true
      missing.push("title")
    }
    if(!data.author){
      error = true
      missing.push("author")
    }
    if(error){
      res.render('book_detail' , {
        "error": true,
        "fields": missing,
        ...data
      })
    }else{
      Book.
      update(data , {
        where: {
          id: req.params.id
        }
      })
      .then(book=>{
        res.redirect('/')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  })

  app.get('/*' , (req , res)=>{
    res.render("error")
  })

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}!`);
  });
