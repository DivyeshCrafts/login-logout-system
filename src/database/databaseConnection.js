import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"


const db_connect = async ()=>{
    try {
        const connect_db = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`\nMongodb connected, host:${connect_db.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error", error)
        process.exit(1)
    }
}

export default db_connect