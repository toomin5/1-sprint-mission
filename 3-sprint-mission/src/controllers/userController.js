import { prismaClient } from "../lib/prismaClient.js";
import bcrypt from "bcrypt";

// password hashing
function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

// signUp
export async function createUser(req, res) {
  const { email, nickname, password, image } = req.body;
  try {
    const existedUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existedUser) {
      const error = new Error("user already exists");
      error.code = 422;
      error.data = { email };
      throw error;
    }

    const hashedPassword = await hashingPassword(password);

    const newUser = await prismaClient.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
        image: image || null,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.code || 500).json({
      message: error.message,
    });
  }
}
