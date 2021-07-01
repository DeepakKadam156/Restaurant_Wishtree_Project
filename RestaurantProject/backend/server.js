const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const PORT = 5000;
require("./db/conn");

const restoRouter = require("./routes/restoRoute");
const loginRouter = require("./routes/loginRoutes");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

require("./db/passport")(passport);

app.use("/admin", loginRouter);
app.use("/resto", restoRouter);

//starting server at 5000 port

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
