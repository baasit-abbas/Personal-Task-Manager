import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL

let cache = global.mongoose

if (!cache){
    cache = global.mongoose = {conn:null,promise:null}
}

export async function ConnectToDatabase() {
    if (cache.conn){
        return cache.conn
    }
    if (!cache.promise){
        cache.promise = mongoose.connect(MONGO_URL)
    }
    cache.conn = await cache.promise
    return cache.conn
}