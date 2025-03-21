import { JWT_SECRET } from "../lib/constants.js";
import { expressjwt } from "express-jwt";

export const verifyRefreshToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.refreshToken,
});
