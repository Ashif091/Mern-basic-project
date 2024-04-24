import experss from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = experss()

app.listen(3000, () => {
  console.log("Server running on prot 3000")
})
