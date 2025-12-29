import { Router } from "express";
import { createUser1, deleteUser1, getUsers1 } from "../../modules/users/users.controller.js";

export const router = Router()

//จำเป็นต้องรับ req, res ทุกครั้งถึงแม้จะใช้หรือไม่ก็ตาม
router.get("/", getUsers1);


router.post("/", createUser1);

// The function inside is called Route Handler / Controller
router.delete("/:id", deleteUser1);

//ถ้ามันเจอ middleware ตัวที่ match กับ  req  มันก็จะเข้าไปตรงนั้นแล้วก็กลับเลย ไม่ได้ไปดูต่อ middleware ตัวอื่น