const { Router } = require("express");
const { createProfile } = require("../controller/profileController");

const profileRoute = Router();
profileRoute.post("/", createProfile);

module.exports = profileRoute;
