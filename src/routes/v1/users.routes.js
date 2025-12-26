import { Router } from "express";
import { createUser, deleteUser, getUsers, testAPI } from "../../modules/users/users.controller.js";

export const router = Router()

router.get("/test", testAPI);

//จำเป็นต้องรับ req, res ทุกครั้งถงึแม้จะใช้หรือไม่ก็ตาม
router.get("/", getUsers);


router.post("/", createUser);

// The function inside is called Route Handler / Controller
router.delete("/:id", deleteUser);

//ถ้ามันเจอ middleware ตัวที่ match กับ  req  มันก็จะเข้าไปตรงนั้นแล้วก็กลับเลย ไม่ได้ไปดูต่อ middleware ตัวอื่น