const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.use("", require("./Routes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server up on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database Connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
