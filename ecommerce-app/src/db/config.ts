import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.DATABASE_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbName = "gc2-ecommerce";

export const db = client.db(dbName);