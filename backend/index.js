const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const rolesRouter = require("./Routes/roleRouter")
const commentRouter = require("./Routes/commentRouter")
const userRouter = require("./Routes/userRouter")
const productRouter = require("./Routes/productRouter")
const cartRouter = require("./Routes/cartRouter")
const loginRouter = require("./Routes/loginRouter")


// Routes Middleware
app.use("/roles", rolesRouter);
app.use("/comments", commentRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/login", loginRouter);



// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
