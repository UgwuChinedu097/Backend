const express = require('express')
const app = express()
const port = 6900
app.use(express.json())


app.get("/", (req, res ) => {
    res.status(200).json(todo)
})

app.post("/", (req, res) => {
    const {title, description, status, priority, dueDate} = req.body
    todo.push({
        id: length + 1,
        title, description, status, priority, dueDate 
    })
    res.status(200).json({Message: "Successfully created" })
})

app.patch("/:id", (req, res) => {
    let id = req.params
    id = parseInt(id)
    const update = todo.find((e) => e.id === id)
    if (update) {
        if (title)update.title = title
        if (description)update.description = description
        if (status) update.status = status
        if (priority) update.status = priority
        if (dueDate) update.dueDate = dueDate
        res.status(200).json({Message: "updated successfully", data:  req.body})
    }else{
        res.status(404).json({ message: "task does not exist" })
    }
})

app.delete("/:id", (req, res) => {
    let id = req.params
    id = parseInt(id)
    const findTodo = todo.find((e) => e.id === id)
    if (findTodo) {
        const deleteTodo = todo.filter((e) => e.id !== id)
        todo = deleteTodo
        res.status(200).json({ Message: "Todo deleted successfully"})
    } else{
        res.status(404).json({ Message: "Todo not deleted "})
    }
})

app.get("/:status",  (req, res) => {
    let {status} = req.params
    const getStatus = todo.filter((e) => e.status === status)
    res.status(200).json({Message: "Gotten successfully", data: getStatus})
})

app.get("/:dueDate", (req, res) => {
    let { dueDate } = req.params
    const getDate = todo.filter((e) => e.dueDate === dueDate)
    res.status(200).json({message: "Gotten successfully", data: getDate})
})

app.delete("/", (res, res) =>{
    todo = []
    res.status(200).json({message: "deleted Successfully", data: todo})
})

app.get("*", (req, res) => {
    res.status(404).json({Message: "Page not Found"})
})

app.listen(port, () => {
    console.log(`Running on server:${port}`)
})