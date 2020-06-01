const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Body parser Middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB config
const db = require("./config/keys").mongoUri;

// Connect Database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
mongoose.set("useFindAndModify", false);

// Use Api Routes
app.use("/api/todos", require("./routes/api/todos"));

// If the environment is production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Get the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
