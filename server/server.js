const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 6060
const config = require('./config/connectDB')
const connectDB = require('./config/connectDB')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')

const app = express();
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });


dotenv.config()
connectDB()

app.get("/", (req,res) => {
    res.send("You have reached the server")
})

app.use("/api", userRoutes)
app.use("/api/notes", noteRoutes)

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`)
})