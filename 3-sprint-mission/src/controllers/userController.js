import { prismaClient } from "../lib/prismaClient.js";
import { JWT_SECRET } from "../lib/constants.js";
import { createToken } from "../lib/tokens.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// password hashing
function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

// password,token filter
function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
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

// login
export async function getUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "invalidate user" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "invalidate user" });
    }

    const accessToken = createToken(user);
    const refreshToken = createToken(user, "refresh");

    await prismaClient.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    const filtered = filterSensitiveUserData(user);
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ message: "internel server error" });
  }
}

// token / refresh
export async function refreshToken(req, res) {
  try {
    const { userId } = req.auth;
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });
    if (!user || user.refreshToken !== req.cookies.refreshToken) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const accessToken = createToken(user);
    return res.status(201).json({ accessToken });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({ message: "internel server e" });
  }
}
