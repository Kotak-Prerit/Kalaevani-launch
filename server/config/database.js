const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(
      `Database connected with server : \n HOST : ${data.connection.host} \n PORT : ${data.connection.port}`
    );
  });
};

module.exports = connectDB;
