import errorMiddleware from "./middlewares/error-middleware";
import router from "./router";

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
const PORT: string = process.env.PORT || "5000"

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const start = async (): Promise<any> => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, (): void => {
            console.log("Server been started on port: " + PORT)
        })
    } catch (error: any) {
        console.log(error)
    }
}

start().then()