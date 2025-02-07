const sql = require("./db.js");

// Constructor
const Product = function (product) {
  this.pro_name = product.pro_name;
  this.price = product.price;
  this.cat_id = product.cat_id;
};

// Fetch all data
Product.getAll = (result) => {
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Product: ", res);
    result(null, res);
  });
};

// Static method to create a new product
Product.create = (newProduct, result) => {
  console.log(newProduct)
  sql.query("INSERT INTO products SET ?", newProduct, (error, response) => {
      if (error) {
          console.error(error);
          result(error, null);
          return;
      }
      result(null, { id: response.insertId, ...newProduct });
  });
};


// Static method to update a product by id
Product.updateById = (id, updatedProduct, result) => {
  sql.query("UPDATE products SET ? WHERE id = ?", [updatedProduct, id], (error, response) => {
      if (error) {
          console.error(error);
          result(error, null);
          return;
      }

      if (response.affectedRows == 0) {
          // Product not found with the specified id
          result({ kind: "not_found" }, null);
          return;
      }

      result(null, { id: id, ...updatedProduct });
  });
};


// Static method to delete a product by id
Product.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE id = ?", id, (error, response) => {
      if (error) {
          console.error(error);
          result(error, null);
          return;
      }

      if (response.affectedRows == 0) {
          // Product not found with the specified id
          result({ kind: "not_found" }, null);
          return;
      }

      result(null, response);
  });
};





module.exports = Product;
