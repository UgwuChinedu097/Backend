const { Router } = require("express");
const { createUser, getOneUser } = require("../controller/userController");

const userRoute = Router();
userRoute.post("/", createUser);
userRoute.get("/:id", getOneUser);

module.exports = userRoute;
