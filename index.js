const express = require("express");
const userRouter = require("./routes/users");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/users", userRouter);

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening to port: ", { port });
});
