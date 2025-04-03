import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/constants";

// access , refresh
export function createToken(user, type) {
  const payload = { userId: user.id };
  const options = {
    expiresIn: type === "refresh" ? "2w" : "1h",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}
