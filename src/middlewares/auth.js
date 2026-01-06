import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    let token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({
            error: true,
            code: "NO_TOKEN",
            message: "Access denied. No token.",
        });
    }

    try {
        //decoded_token = jwt.sign ที่เราเขียนไว้ ของในนั้นจะมี 
        // 1.userId
        // 2.iat (Issued At) บอกว่า Token นี้สร้างขึ้นเมื่อไหร่
        //3.expiresIn: "1h"
        //หน้าที่ของ jwt.verify คือ 1.แปลงรหัสให้อ่านได้และเทียบ token กับ process.env.JWT_SECRET 👀 2.ดูวันหมดอายุ 💥 3.Decode ถ้าทุกอย่างถูกต้อง ✅
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        //ให้ express สร้างกระเป๋าใบใหม่ชื่อ user แล้วสร้าง user เพิ่มอีกตัว แล้วจากนั้นมันจะเอาค่า userId จาก Tokenไปใส่ไว้ใน _id 
        req.user = {user: {_id: decoded_token.userId}};
        next();
        } catch (error) {
        next(error);
    }
};