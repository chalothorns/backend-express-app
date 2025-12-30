import { users } from "../../mock-db/users.js";
import { User } from "./users.model.js";

//API 1 🟥🟥
//🔴 route handler:get all users(mock)
export const getUsers1 = (req, res) => {
  res.status(200).json(users);
  // console.log(res);
};

//🔴 route handler:delete a user(mock)
export const deleteUser1 = (req, res) => {
  const userId = req.params.id;

  //มันจะเข้าไปดู object index ในตัวแปร users ว่า id ในนั้นตรงกับที่ user send request มาไหม
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);

    res.status(200).send(`User with ID ${userId} deleted ✅`);
  } else {
    res.status(404).send("User not found.");
  }
};

//🔴 route handler:create a new user(mock)
export const createUser1 = (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: String(users.length + 1),
    name: name,
    email: email,
  };

  users.push(newUser);

  res.status(201).json(newUser);
};


//API 2 🟩🟩
//🟢 route handler: GET a single user by id form the database
export const getUser2 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const doc = await User.findById(id).select("-password");

    if (!doc) {
      const error = new Error("User not found");
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to get a user";

    return next(error);
  }
};

//🟢 route handler:get all users from the database
export const getUsers2 = async (req, res, next) => {
  try {
    //การใส่เครื่องหมายลบ (-) หน้าชื่อฟิลด์ในคำสั่ง .select() ของ Mongoose เป็นสัญลักษณ์ที่ใช้บอกว่า "ไม่เอา" (Exclude) หรือให้ "ตัดฟิลด์นี้ออก
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    // error.name = error.name || "DatabaseError";
    // error.status = 500; ใส่หรือไม่ก็ได้
    return next(error);
  }
};

//🟢 route handler:delete a user in the database
export const deleteUser2 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      const error = new Error("User not found");
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

//🟢 route handler: create a new user in the database
export const createUser2 = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    const error = new Error("username, email, and password are required");
    error.name = "ValidatationError";
    error.status = 404;
    return next(error);
  }

  try {
    const doc = await User.create({ username, email, password, role });
    //ใช้ .toObject เพราะอยากให้ข้อมูลที่ถูกกลับไปเปน plaib object JS ไม่ต้องมีของแถมอื่นๆใน mongoose ติดมาด้วย อีกอย่างบางที มักจะมาคู่กับการตั้งค่า เพื่อจัดการกับข้อมูลก่อนส่งออกไป เช่นลบ pw ออกก่อนส่งข้อมูลกลับ
    const safe = doc.toObject();
    delete safe.password;

    return res.status(201).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    //11000 เป็นรหัสสำหรับตรวจอีเมลซ้ำ
    if (error.code === 11000) {
      error.status = 409;
      error.name = "DuplicateKeyError";
      error.message = "Email already in use";
    }

    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to create a user";
    return next(error);
  }
};

//🟢 route handler: update a user in the database
export const updateUser2 = async (req, res, next) => {
  const { id } = req.params;

  const body = req.body;

  try {
    const updated = await User.findByIdAndUpdate(id, body);

    if (!updated) {

    const error = new Error("User not found");
      return next(error);
    }

    const safe = updated.toObject();
    delete safe.password;

    return res.status(200).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    if (error.code === 11000){
      return next(error);
    }
    return next(error);
  }
};
