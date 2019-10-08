var express = require("express");
var app = express();
var bp = require("body-parser");
var _ = require("underscore");

app.use(express.static("public"));
app.use(bp.json());

var uid = 1;
var userdata = [
  // { taskname: "purchase veggies", completed: true },
  // { taskname: "play games", completed: false },
  // { taskname: "feed the cat", completed: false }
];

app.post("/posttasks", function(req, res) {
  var data = req.body;
  data.id = uid++;
  userdata.push(data);
  res.send("data is added!");
});

app.get("/loadtasks", function(req, res) {
  res.json(userdata);
});
app.get("/loadtasks/:id", (req, res) => {
  var todoid = parseInt(req.params.id);
  var mct = _.findWhere(userdata, { id: todoid });
  //   userdata.forEach(function(todo) {
  //     if (todoid == todo.id) {
  //       mct = todo;
  //     }
  //   });
  if (mct) {
    res.json(mct);
  } else {
    res.status(404).send();
  }
});

app.listen(4000, function() {
  console.log("server is ready!!");
});
