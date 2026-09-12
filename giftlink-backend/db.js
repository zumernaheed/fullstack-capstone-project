import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "giftlink";

let client;
let db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  client = new MongoClient(uri, {
  family: 4,
  serverSelectionTimeoutMS: 10000
});

  await client.connect();

  console.log("Connected successfully to MongoDB");

  db = client.db(dbName);

  return db;
}