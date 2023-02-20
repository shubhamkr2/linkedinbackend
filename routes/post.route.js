const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const { PostModel } = require("../models/post.model");

const postRoute = Router();
postRoute.use(auth);

postRoute.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID });
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
  res.status(200).send("Welcome to Post page");
});

postRoute.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const newPost = new PostModel(payload);
    await newPost.save();
    res
      .status(201)
      .send({ msg: "Post successfully created", post: payload.title });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
});

postRoute.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const post = await PostModel.findOne({ _id: id });
    const user = req.body.userID;
    console.log(user, post.userID);
    if (user === post.userID) {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.status(200).send({ msg: "Post successfully updated" });
    } else {
      res.status(500).send({ msg: "you are not authorized" });
    }
  } catch {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
});

postRoute.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findOne({ _id: id });
    const user = req.body.userID;
    // console.log(user, post.userID);
    if (user === post.userID) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "Post successfully deleted" });
    } else {
      res.status(500).send({ msg: "you are not authorized" });
    }
  } catch {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
}); 

module.exports = { postRoute };
