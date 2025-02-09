module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    app.post("/user", user.create);
    app.post("/user/login", user.login);
    

  };