import { connection } from "../database.js";
import User from "../modals/user.modal.js";
import { v4 as uuidv4 } from "uuid";

export const pingToCheckUser = async (req, res) => {
  const IP = req.ip;
  try {
    const rows = await User.findOne({ where: { ip: IP } });
    if (!rows) {
      return res.status(200).json({ msg: false });
    } else {
      return res.status(200).json({
        msg: true,
        data: {
          userId: rows.userId,
          name: rows.name,
          isAdmin: rows.isAdmin,
          isDev: rows.isDev,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({ msg: false });
  }
};

export const createUser = async (req, res) => {
  const { name } = req.body;
  const ip = req.ip;
  const regex = /^[a-zA-Z ]{3,30}$/;
  if (!regex.test(name)) {
    return res.status(400).json({
      msg: "Name should be 3-30 characters long and contain only letters and spaces.",
    });
  }
  try {
    const newUser = await User.create({
      userId: uuidv4(),
      ip: ip,
      name: name,
    });
    return res.status(201).json({
      msg: true,
      data: {
        userId: newUser.userId,
        name: newUser.name,
        isAdmin: newUser.isAdmin,
        isDev: newUser.isDev,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
