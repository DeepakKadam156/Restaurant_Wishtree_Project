const mongoose = require("mongoose");

//connecting to the database

mongoose.connect("mongodb://localhost/restoApi", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Database Connected..");
});
