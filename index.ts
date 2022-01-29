require('dotenv').config()
const express = require('express')

const app: any = express()
const PORT: String = process.env.PORT || "5000"


app.get("/api", (req: any, res: any): void => {
    res.json({text: "hello"})
})

app.listen(PORT, (): void => {
    console.log("Server been started on port: " + PORT)
})