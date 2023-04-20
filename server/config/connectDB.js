const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
URI = process.env.URI || "mongodb+srv://Nupoor10:Nupoor10@cluster0.6yx8z16.mongodb.net/?retryWrites=true&w=majority"

async function connectDB() {
    const conn = await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
}

connectDB().then( () => {
    console.log("Sucessfully connected to database")
  }
).catch (
    err => {
        console.log(`Error Occurred : ${err}`)
    }
)

module.exports = connectDB;