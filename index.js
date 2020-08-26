const express = require('express');
const app= express();

const bodyParser= require('body-parser')
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/UrlApp', {useNewUrlParser: true});

const {UrlModel} = require('./models/urlshort');
app.use(express.static('public'));
app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', function(req,res){
   let allUrl=UrlModel.find(function(err,result){
    res.render('home', {
        urlResult : result
    })
   })
   
});

app.post('/create', function (req,res) {
    console.log(req.body.longurl)
    //console.log(generateUrl())
   let urlShort=new UrlModel({
        longUrl : req.body.longurl,
        shortUrl : generateUrl()
    })
    urlShort.save(function(err,data){
       
        if (err) throw err;
        
         res.redirect('/');
    })
  });

  app.get('/:urlId', function (req, res) {
    UrlModel.findOne({ shortUrl: req.params.urlId }, function (err, data) {
        if (err) throw err;

        UrlModel.findByIdAndUpdate({ _id: data.id }, { $inc: { clickCount: 1 } }, function (err, updatedData) {
            if (err) throw err;
            res.redirect(data.longUrl)
        })


    })
})

app.get('/delete/:id',function(req,res){
    UrlModel.findByIdAndDelete({_id:req.params.id},function(err,deleteData){
        if(err) throw err;
        res.redirect('/')
    })
})

app.listen(8000, function() {
    console.log('Port running in 8000')
  });

  function generateUrl(){
      var rndResult= Math.floor(Math.random()*100000);
      console.log(rndResult)
      return rndResult;
  }