import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4,
  serverSelectionTimeoutMS: 10000
});

try {
  await client.connect();

  await client.db("admin").command({
    ping: 1
  });

  console.log("MongoDB Atlas connection successful");
} catch (error) {
  console.error("MongoDB connection failed:");
  console.error(error);
} finally {
  await client.close();
}