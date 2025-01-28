const sql = require("./db.js");

const User = function (user) {
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (error, response) => {
      if (error) {
        console.error(error);
        result(error, null);
        return;
      }
  
      result(null, { id: response.insertId, ...newUser });
    });
  };



User.loginByEmailAndPassword = (email, password, result) => {
  const qry = "SELECT id, email, password FROM user WHERE email=? AND password=?";

  sql.query(qry, [email, password], (error, response) => {
    if (error) {
      result(error, null);
      return;
    }

    if (response.length) {
      result(null, response[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
