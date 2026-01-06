import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { router as apiRoutes} from "./routes/index.js"
import { limiter } from "./middlewares/rateLimiter.js";



export const app = express();

app.set("trust proxy", 1)

// Global middleware
app.use(helmet());

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://react-frontend-connect-db.vercel.app",

    ],
credentials: true //✅ allow cookies to be sent
};

app.use(limiter);

app.use(cors(corsOptions));

//use Middleware called .json
app.use(express.json());

//Middleware to parse cookies (required for cookie-base auth)
app.use(cookieParser());

//มีเพื่อเช็คว่า route ใช้งานได้ไหม
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api", apiRoutes);

// Catch-all for 404 Not Found
app.use((req, res, next) =>{
    const error = new Error(`Not found: ${req.method} ${req.originalUrl}`)
    error.name = "NotFoundError";
    error.status = error.status || 404;
    next(error)
})

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        stack: err.stack,
    });
});

