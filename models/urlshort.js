const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    longUrl :{

        type : String,
        required: true},
        
    shortUrl : {

        type : String,
        unique : true
    },
    
  
  }, {timestamps : true});

const UrlModel = mongoose.model('urlShort', UrlSchema);

module.exports = {UrlModel};
