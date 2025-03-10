const Express = require("express");
const db = require("./config/db");
const userRouter = require('./routes/userRoute')
const walletsRouter = require("./routes/walletsRoutes")
const morgan = require("morgan");
require("dotenv/config");

const { PORT } = process.env;

const app = Express();
app.use(Express.json());
app.use('/auth', userRouter)
app.use("/wallet", walletsRouter)
app.use(morgan("dev"));

db();

app.listen(PORT, () => {
  console.log(new Date().toLocaleDateString(), PORT);
});
