import connectDB from "../src/db/index.js";
import dotenv from "dotenv";
import { app, port, baseURL } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(port , ()=>{
        console.log(`Server is running at: ${baseURL}`)
    })
})
.catch((error)=>{
    console.log(error);
})