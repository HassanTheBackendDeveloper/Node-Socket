require("dotenv").config();

const app = require("./app");
const connectDb = require("./db");

const PORT = process.env.PORT;

(async () => {
  try {
    await connectDb();

    app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
