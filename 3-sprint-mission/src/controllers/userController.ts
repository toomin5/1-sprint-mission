import { createToken } from "../lib/tokens";
import userService from "../services/userService";

// signUp
export async function createUser(req, res, next) {
  const { email, nickname, password } = req.body;
  try {
    const user = await userService.createUser(email, nickname, password);
    return res.send(user);
  } catch (error) {
    return next(error);
  }
}

// login
export async function getUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await userService.validUser(email, password);
    const accessToken = createToken(user);
    const refreshToken = createToken(user, "refresh");
    await userService.update(user.id, { refreshToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).send({ accessToken });
  } catch (error) {
    return next(error);
  }
}

// token / refresh
export async function refreshToken(req, res, next) {
  const { userId } = req.auth;
  const refreshToken = req.cookies.refreshToken;
  try {
    const accessToken = await userService.refreshAccessToken(
      userId,
      refreshToken
    );
    return res.status(200).send({ accessToken });
  } catch (error) {
    return next(error);
  }
}

export async function getUserInfo(req, res, next) {
  const id = req.user.userId;
  console.log(id);
  try {
    const user = await userService.meInfo(id);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

export async function patchUser(req, res) {
  const { userId } = req.user;
  const patchData = req.body;
  const patchedUser = await userService.update(userId, patchData);

  return res.status(200).send(patchedUser);
}

export async function patchUserPassword(req, res) {
  const { userId } = req.user;
  const { password, newPassword } = req.body;

  await userService.patchPassword(userId, password, newPassword);
  res.status(200);
}
