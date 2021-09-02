const mongoose = require('mongoose');
const {connect} = require("mongoose");




mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager' , {useNewUrlParser : true , useUnifiedTopology : true})
.then(() => {console.log("Db connected successfuly!")
             })
    .catch((error) => {console.log(error)
    });
module.exports=mongoose;
