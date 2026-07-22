import { getDB } from "../../config/db.js";

const collection = () => getDB().collection("users");

export async function findByEmail(email) {
  return collection().findOne({ email });
}

export async function findByIdentity(identifier, password) {
  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const filter = isEmail
    ? { email: identifier, password }
    : { phone: identifier, password };

  return collection().findOne(filter);
}

export async function createUser(userData) {
  const result = await collection().insertOne(userData);
  return { ...userData, _id: result.insertedId };
}
