const sql = require("./db.js");

// Constructor
const Category = function (category) {
  this.cat_name = category.cat_name;
};

// Fetch all data
Category.getAll = (result) => {
  sql.query("SELECT * FROM category", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Categories: ", res);
    result(null, res);
  });
};

// Static method to create a new category
Category.create = (newCategory, result) => {
  console.log(newCategory);
  sql.query("INSERT INTO category SET ?", newCategory, (error, response) => {
    if (error) {
      console.error(error);
      result(error, null);
      return;
    }
    result(null, { id: response.insertId, ...newCategory });
  });
};

// Static method to update a category by id
Category.updateById = (id, updatedCategory, result) => {
  sql.query("UPDATE category SET ? WHERE id = ?", [updatedCategory, id], (error, response) => {
    if (error) {
      console.error(error);
      result(error, null);
      return;
    }

    if (response.affectedRows == 0) {
      // Category not found with the specified id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, { id: id, ...updatedCategory });
  });
};

// Static method to delete a category by id
Category.remove = (id, result) => {
  sql.query("DELETE FROM category WHERE id = ?", id, (error, response) => {
    if (error) {
      console.error(error);
      result(error, null);
      return;
    }

    if (response.affectedRows == 0) {
      // Category not found with the specified id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, response);
  });
};

module.exports = Category;
