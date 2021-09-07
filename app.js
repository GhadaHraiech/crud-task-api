const express= require('express');
const app = express ();
const mongoose= require('./database/mongoose');
const TaskList= require('./database/models/taskList');
const Task=require('./database/models/task');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');



    // Pass to next layer of middleware
    next();
});
// example of middleware
app.use(express.json());


//Routes or Rest API EndPoints or WebServices Endpoints
/*
TaskList - Create , Update , ReadTaskListById , ReadAllTaskList
Task- Create , Update , ReadTaskById , ReadAllTask
*/
//Routes or  API EndPoints for TaskList Model
//Get all Task Lists
//http://localhost:3000/tasklists => [{TaskList} , {TaskList}]

app.get('/tasklists', (req, res) =>{

    TaskList.find({})
        .then(lists => {res.status(200).send (lists)})
        .catch((error) => {console.log(error);
            res.status(500);});


});
 //rOUTES OR Endpoint for creating TaskList
app.post('/tasklists', (req, res) => {
    // console.log("hello i'm inside post method");
console.log(req.body);
    let taskListObject= {'title':req.body.title};
    TaskList(taskListObject).save()
        .then((taskList)=>{res.status(201).send (taskList)})
        .catch((error) => {console.log (error);
        res.status(500);});

} );

//endpoint to get one tasklist by taskListId
app.get('/tasklists/:tasklistId', (req, res) => {
    let tasklistId= req.params.tasklistId;
TaskList.find({ _id: tasklistId})
    .then((taskList) => {
        res.status(200).send(taskList)
    })
    .catch((error) => console.log(error))
});

//put is a full update of object
app.put('/tasklists/:tasklistId', (req , res) =>{
  TaskList.findOneAndUpdate({_id: req.params.tasklistId} , {$set : req.body})
      .then((taskList)=>{res.status(200).send (taskList)})
      .catch((error) => {console.log (error);
         });


});
// patch is partial update of one field of an object
app.patch('/tasklists/:tasklistId', (req , res) =>{
    TaskList.findOneAndUpdate({_id: req.params.tasklistId} , {$set : req.body})
        .then((taskList)=>{res.status(200).send (taskList)})
        .catch((error) => {console.log (error);
        });


});

// delete a tasklist  with id
app.delete('/tasklists/:tasklistId', (req , res) =>{
    TaskList.findByIdAndRemove({_id: req.params.tasklistId})
        .then((taskList)=>{res.status(200).send (taskList)})
        .catch((error) => {console.log (error);
        });


});


/* Crud operation for task , a task should always belong to TakList*/
//http://localhost:3000/tasklists/:tasklistId/tasks/:taskId

// Get all tasks for 1 TaskList http://localhost:3000/tasklists/:tasklistId/tasks
app.get('/tasklists/:tasklistId/tasks', (req, res) => {
 
Task.find({_tasklistId: req.params.tasklistId})
    .then((tasks) => {
        res.status(200).send(tasks)
    })
    .catch((error) => console.log(error));
});

// Create a task inside of a taskList
app.post('/tasklists/:tasklistId/tasks', (req, res) => {
    // console.log("hello i'm inside post method");
    console.log(req.body);
    let taskObject= {'title':req.body.title,'_tasklistId':req.params.tasklistId} ;
    Task(taskObject).save()
        .then((task)=>{res.status(200).send (task)})
        .catch((error) => {console.log (error);
            res.status(500);});

} );


//http://localhost:3000/tasklists/:tasklistId/tasks/:taskId
//Get one task inside one taskList

app.get('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {

    Task.findOne({_tasklistId: req.params.tasklistId ,_id: req.params.taskId })
        .then((task) => {
            res.status(200).send(task)
        })
        .catch((error) => console.log(error));
});


// //put is a full update of object
// app.put('/tasklists/:tasklistId/tasks/:taskId', (req , res) =>{
//     TaskList.findOneAndUpdate({_tasklistId: req.params.tasklistId ,_id: req.params.taskId  } , {$set : req.body})
//         .then((task)=>{res.status(200).send (task)})
//         .catch((error) => {console.log (error);
//         });
//
//
// });
// patch is partial update of one field of an object
app.patch('/tasklists/:tasklistId/tasks/:taskId', (req , res) =>{
    Task.findOneAndUpdate({_tasklistId: req.params.tasklistId ,_id: req.params.taskId } , {$set : req.body})
        .then((task)=>{res.status(200).send (task)})
        .catch((error) => {console.log (error);
        });


});

 // delete a tasklist  with id
 app.delete('/tasklists/:tasklistId/tasks/:taskId', (req , res) =>{
     Task.findByIdAndRemove({_tasklistId: req.params.tasklistId ,_id: req.params.taskId })
        .then((task)=>{res.status(200).send (task)})
        .catch((error) => {console.log (error);
         });


 });









app.listen(3000 , function(){console.log("server started on port 3000 ")});
