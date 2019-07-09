require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 3030;

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Express Session Middleware
app.use(express.static(path.join(__dirname, "react-app/build")));

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
// Express Messages Middleware
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
require("./myapp/config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

const siyumem = require("./myapp/routes/siyumem");
const siyum = require("./myapp/routes/siyum");
const masechtos_mishnayos = require("./myapp/routes/masechtos_mishnayos");
const masechtos_learned = require("./myapp/routes/masechtos_learned");
const users = require("./myapp/routes/users");
app.use("/siyumem", siyumem);
app.use("/siyum", siyum);
app.use("/masechtos_mishnayos", masechtos_mishnayos);
app.use("/masechtos_learned", masechtos_learned);
app.use("/users", users);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/react/build/index.html"));
});
app.listen(PORT, () => console.log("Example app listening on port " + PORT));
