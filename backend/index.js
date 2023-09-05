const express = require('express');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const userRouter = require("./src/routes/user.routes")
// app.use("/api/v1/users",userRouter)
app.use(userRouter)

app.get('*', (req, res) => {
    res.send("Hello WOrld");
});


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
require('./src/db/database')