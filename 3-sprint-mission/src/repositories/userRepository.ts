import { prismaClient } from "../lib/prismaClient";

async function getById(id) {
  return await prismaClient.user.findUnique({
    where: {
      id: id,
    },
  });
}

async function getByEmail(email) {
  return await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
}

async function changePassword(id, password) {
  return await prismaClient.user.update({
    where: {
      id: id,
    },
    data: {
      password: password,
    },
  });
}

async function deleteById(id) {
  return await prismaClient.user.delete({
    where: {
      id: id,
    },
  });
}

async function update(id, data) {
  return await prismaClient.user.update({
    where: {
      id: id,
    },
    data: data,
  });
}

async function save(user) {
  return await prismaClient.user.create({
    data: {
      email: user.email,
      nickname: user.nickname,
      password: user.password,
      image: user.image,
    },
  });
}

export default {
  deleteById,
  changePassword,
  update,
  save,
  getByEmail,
  getById,
};
