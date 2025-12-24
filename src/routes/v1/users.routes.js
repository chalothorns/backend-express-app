import { Router } from "express";
import { createUser, deleteUser, getUser, testAPI } from "../../modules/users/users.controller.js";

export const router = Router()

router.get("/test", testAPI);

//จำเป็นต้องรับ req, res ทุกครั้งถงึแม้จะใช้หรือไม่ก็ตาม
router.get("/", getUser);


router.post("/", createUser);

// The function inside is called Route Handler / Controller
router.delete("/:id", deleteUser);