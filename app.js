const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos');

const Todo = mongoose.model('Todo', {
    item: String,
    priority: Number,
    priorityDescription: String
}); 

const port = process.env.PORT || 3000;
app.use(express.static('./client'));
app.use(bodyParser());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/todos', (req, res) => {
    // query
    Todo.find(function(err, todos) {
        res.json(todos);
    });
});

app.post('/todos', (req, res) => {
    console.log(req.body);
    const newTodo = new Todo(req.body);

    newTodo.save(function(err) {
        if(err) {
            res.send('an error has occured: ' + err)
        } else {
            res.send('ok')
        }
    }); 
});

app.delete('/todos/:id', (req, res) => {
    console.log(req.params.id);
    Todo.remove({_id: req.params.id}, (err) => {
        if (err) {
            return console.log(err);
        } else {
            res.send('ok');
        }
    });
});


app.listen(port, () => {
    console.log('Listening on port ' + port);
});