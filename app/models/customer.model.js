const sql = require("./db.js");

// Constructor
const Product = function (product) {
  this.pro_name = product.pro_name;
  this.price = product.price;
  this.cat_id = product.cat_id;
};

// Fetch all data
Product.getAll = (result) => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Product: ", res);
    result(null, res);
  });
};

module.exports = Product;
