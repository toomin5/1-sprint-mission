import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { createToken } from "../middleware/token.js";
import { refreshToken } from "../controllers/userController.js";

// password hashing
async function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

async function isValidPassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new Error("unauthorized");
  }
}
// password,token filter
// 비구조화할당 , rest operator
async function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
}

async function createUser(email, nickname, password, image) {
  const existedUser = await userRepository.getByEmail(email);

  if (existedUser) {
    throw new Error("already user Email");
  }

  const hashedPwd = await hashingPassword(password);
  const newUser = await userRepository.save({
    email,
    nickname,
    password: hashedPwd,
    image: image || null,
  });

  return filterSensitiveUserData(newUser);
}

async function validUser(email, password) {
  const user = await userRepository.getByEmail(email);

  if (!user) {
    throw new Error("user not found");
  }
  await isValidPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function update(id, data) {
  return await userRepository.update(id, data);
}

async function meInfo(id) {
  const user = await userRepository.getById(id);
  return filterSensitiveUserData(user);
}

async function refreshAccessToken(userId, refreshToken) {
  const user = await userRepository.getById(userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("unauthorized");
  }
  const accessToken = createToken(user);
  return accessToken;
}

async function patchPassword(id, password, newPassword) {
  const user = await userRepository.getById(id);
  console.log(user);
  console.log("password:", password, "newPassword:", newPassword);
  if (!user) {
    throw new Error("user not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("Is password valid?", isPasswordValid); // 비교 결과를 확인
  console.log("Stored hashed password:", user.password); // 저장된 해시된 비밀번호 확인
  if (!isPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log("hashed:", hashedPassword);

  await userRepository.update(id, { password: hashedPassword });
  return { message: "patched password" };
}

export default {
  createUser,
  validUser,
  update,
  meInfo,
  refreshAccessToken,
  patchPassword,
};
