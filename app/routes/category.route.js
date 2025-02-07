module.exports = app => {
    const products = require("../controllers/category.controller.js");
  
    app.get("/category", products.findAll);
    app.post("/category", products.create);
    app.put("/category/:id", products.update);
    app.delete("/category/:id", products.delete);
  }