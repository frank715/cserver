const bcrypt = require("bcryptjs");
const users = [
  {
    name: "superadmin",
    email: "superadmin@gmail.com",
    password: bcrypt.hashSync("admin123"),
    phone: "123456789",
    type: "Admin",
    username: "superadmin",
  },
];

module.exports = users;
