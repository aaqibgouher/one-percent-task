const express = require("express");
require("dotenv").config();
require("./database/config");
const router = require("./routes");
require("./models");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
