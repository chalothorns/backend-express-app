import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, //Limit each IP address to 100 requests per 15 minutes
    standardHeaders: true, //ใช้ http รุ่นใหม่
    legacyHeaders: false, 

})