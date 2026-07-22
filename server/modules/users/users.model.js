import { ObjectId } from "../../shared/id.js";
import { getDB } from "../../config/db.js";

const collection = () => getDB().collection("users");

export async function findById(id) {
  return collection().findOne({ _id: new ObjectId(id) });
}

export async function updateById(id, data) {
  return collection().updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}
