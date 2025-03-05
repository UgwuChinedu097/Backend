const Express = require("express");
const db = require("./config/db");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");
require("dotenv/config");

const { PORT } = process.env;

const app = Express();
app.use(Express.json());
app.use(morgan("dev"));
app.use("/user", userRoute);
app.use("/profile", profileRoute);

db();

app.listen(PORT, () => {
  console.log(new Date().toLocaleDateString(), PORT);
});
