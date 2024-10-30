const express = require('express')
const app = express();
const crypto = require('crypto')
const todos = {}
const cors = require('cors')
app.use(express.json());
app.use(cors());
app.post('/create', (req, res) => {
    const {title , description, status} = req.body;
    let uuid = crypto.randomUUID();
    if(todos[uuid]){
        res.json({
            message: "Already exist"
        })
    }

    todos[uuid] = {
        title,
        description,
        status
    }
    res.json({
        message: "User created successfully!"
    })

})
app.put('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const {status} = req.body;

    const todo = todos[id];

    todo.status = status;

    res.json({
        message: "status updated."
    });

})
app.get('/all', (req, res) => {
    res.json(todos)
})
app.delete('/:id', (req, res) => {
    const {id} = req.params;
    if(!todos[id]){
        return res.json({
            message: "Todo not available."
        })
    }
    delete todos[id];

    res.json({
        message: "Todo deleted successfully."
    })

})

app.listen(3000, ()=> {
    console.log("Server is up")
})