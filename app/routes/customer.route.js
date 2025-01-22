module.exports = app =>{
    const products = require("../controllers/customer.controller.js");
    app.get("/customer",products.findAll);
}