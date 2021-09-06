const mongoose = require('mongoose');
const taskListSchema= new mongoose.Schema({

    title:{
        type: String,
        trim: true,
        minlength: 3
    },
    // _listId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // }
});
const TaskList= mongoose.model('TaskList', taskListSchema);
module.exports=TaskList;
