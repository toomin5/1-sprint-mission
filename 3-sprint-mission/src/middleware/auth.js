import { JWT_SECRET } from "../lib/constants.js";
import { expressjwt } from "express-jwt";
import { prismaClient } from "../lib/prismaClient.js";

// express-jwt 내부에서 next호출
export const verifyRefreshToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.refreshToken,
});

export const verifyAccessToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

export async function verifyProductAuth(req, res, next) {
  // 상품아이디
  const { id: productId } = req.params;
  const productIdInt = parseInt(productId, 10);
  try {
    //유저아이디
    const product = await prismaClient.product.findUnique({
      where: { id: productIdInt },
    });
    // 상품id값확인
    if (!product) {
      const error = new Error("product not found");
      error.code = 404;
      throw error;
    }
    // product모델의 userid값과 요청한 유저 아이디값
    if (product.userId !== req.user.userId) {
      return res.status(403).json({ message: "forbbiden" });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
