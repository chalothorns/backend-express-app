import { app } from "./app.js";

const port = 3000


let users = [{id:"1", name: "Alice",email: "alice@example.com"}];

// app.get('/', testAPI);

// app.get("/users", getUsers);

// app.post("/users", createUser);


// app.delete("/users/:id", deleteUser);

app.listen(port,() => {
    console.log(`Server running on port: ${port} ✅`);
});

//ถ้ามันเจอ middleware ตัวที่ match กับ  req  มันก็จะเข้าไปตรงนั้นแล้วก็กลับเลย ไม่ได้ไปดูต่อ middleware ตัวอื่น