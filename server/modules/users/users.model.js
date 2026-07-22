import { ObjectId } from "../../shared/id.js";
import { getDB } from "../../config/db.js";

const users = () => getDB().collection("users");

export async function findByEmail(email) {
  return users().findOne({ email });
}

export async function findById(id) {
  return users().findOne({ _id: new ObjectId(id) });
}

export async function createProfile({ fullName, email, phone }) {
  const result = await users().insertOne({
    fullName,
    email,
    phone,
    createdAt: new Date().toISOString(),
  });
  return { fullName, email, phone, _id: result.insertedId };
}

export async function updateByEmail(email, data) {
  return users().updateOne({ email }, { $set: data });
}
