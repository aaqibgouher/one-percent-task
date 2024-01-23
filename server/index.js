const express = require("express");
require("dotenv").config();
require("./database/config");
const router = require("./routes");
require("./models");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Specify allowed origins based on the environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-prod-domain.com"]
    : [`http://localhost:5173`];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
