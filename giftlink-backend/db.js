import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "giftlink";

if (!uri) {
  throw new Error("MONGODB_URI is missing. Add it to giftlink-backend/.env");
}

const client = new MongoClient(uri);
let database;

export async function connectToDatabase() {
  if (database) return database;

  await client.connect();
  database = client.db(dbName);
  return database;
}

export { client };
