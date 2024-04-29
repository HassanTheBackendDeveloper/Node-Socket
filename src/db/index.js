const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${DB_NAME}`
    );

    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Connect DB Error ", error);
  }
};

module.exports = connectDb;
