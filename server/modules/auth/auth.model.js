import { getDB } from "../../config/db.js";

const auth = () => getDB().collection("auth");

export async function findByEmail(email) {
  return auth().findOne({ email });
}

export async function findByIdentity(identifier, password) {
  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const filter = isEmail
    ? { email: identifier, password }
    : { email: identifier, password };

  return auth().findOne(filter);
}

export async function createAuth({ email, password, role }) {
  const result = await auth().insertOne({
    email,
    password,
    role: role || "passenger",
    verified: false,
    createdAt: new Date().toISOString(),
  });
  return { email, role, _id: result.insertedId };
}

export async function verifyAuth(email) {
  return auth().updateOne({ email }, { $set: { verified: true } });
}

export async function savePending(email, data) {
  const col = getDB().collection("pending_users");
  await col.deleteMany({ email });
  return col.insertOne({ email, data, createdAt: new Date() });
}

export async function findPending(email) {
  return getDB().collection("pending_users").findOne({ email });
}

export async function deletePending(email) {
  return getDB().collection("pending_users").deleteMany({ email });
}
