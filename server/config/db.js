import { MongoClient } from "mongodb";

let client;
let db;

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME || "SakayNE";

  client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 10000,
  });

  await client.connect();
  db = client.db(dbName);
  return db;
}

export function getDB() {
  return db;
}
