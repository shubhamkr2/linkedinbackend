const express = require("express");
const { connection } = require("./config/db");
const { postRoute } = require("./routes/post.route");
const { userRoute } = require("./routes/user.route");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/users", userRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.status(200).send("Linkedin Home Page");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Atlas Database");
  } catch (err) {
    console.log(err);
  }
  console.log(`Express server listening on ${process.env.PORT}`);
});
