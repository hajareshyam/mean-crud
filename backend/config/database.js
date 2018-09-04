const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task',{ useNewUrlParser: true },function(err,db){
    if(!err){
        console.log("Database connected successfully ..");
    }else{
        console.log("Database connection fail  : ");
    }
});

module.exports = mongoose;


