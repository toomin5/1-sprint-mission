import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants.js";

export function createToken(user, type) {
  const payload = { userId: user.id };
  const options = {
    expiresIn: type === "refresh" ? "2w" : "1h",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}
