const express = require("express")
const app = express();
const port = 3000;
app.use(express.json())

const toDoLIst = [{
    status: "No",
    data: "Do your Assignment",
    date: 31/1/2025,
    endDate: 2/2/2025
}]

app.get('/', (req, res) => {
    res.status(200).json({toDoLIst})
})

app.post("/", (req, res) =>  {
    const { status, data, startDate, endDate } = req.body;

    const checkIfUserExist = toDoLIst.findIndex((e) => e.status === status);
    if (checkIfUserExist === -1) {
      if (status && data && startDate && endDate) {
        toDoLIst.push({
          id: toDoLIst.length + 1, status, data, startDate, endDate});
        res.status(200).json({
          message: "user created successfully",
        });
      } else {
        res.status(400).json({ message: "All field are required" });
      }
    } else {
      res.status(409).json({ message: "email already exist" });
    }
})

app.get("/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
  
    const getUser = users.findIndex((e) => e.id === id);
    if (getUser === -1) {
      res.status(404).json({ message: "user not found" });
    } else {
      res
        .status(200)
        .json({ message: "user gotten successfully", data: toDoLIst[getUser] });
    }
  });
  
  // delete a user
  app.delete("/:id", (req, res) => {
    const getUser = users.filter((e) => e.id !== parseInt(req.params.id));
    users = getUser;
    res.status(404).json({ messgae: "user deleted successfully" });
  });
  
  // update
  app.patch("/:id", (req, res) => {
    const getUser = users.find((e) => e.id === parseInt(req.params.id));
  
    if (getUser) {
      const { status, data , startDate, endDate } = req.body;
      if (status) getUser.status = status;
      if (data) getUser.data = data;
      if (startDate) getUser.startDate = startDate;
      if (endDate) getUser.endDate = endDate;
  
      res.status(201).json({ message: "user updated successfully" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });

//Not Found
app.all('*', (req,res) =>{
    res.status(404).json({message: "Routes does not exist"})
})

app.listen(port , () => {
    console.log(`http://localhost${port}`)
})