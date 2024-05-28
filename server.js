// 1. Import libraries
import express from "express";
import userRouter from "./src/Features/User/user.router.js";
import organizationRouter from "./src/Features/Organization/organization.router.js";
import taskRouter from "./src/Features/Task/task.router.js";
import jwtAuth from "./src/Middlewares/jwt.middleware.js";

// 2. create server
const server = express(); 
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/organization", jwtAuth, organizationRouter);
server.use("/api/task", jwtAuth, taskRouter);

// 3. Default request
server.get('/', (req, res) => {
    res.send({ info: "Welcome to the Database design and API Development Application Server" })
});


// 4. Middleware to handle 404 requests
server.use((req, res) => {
    res.status(404).send("API not found. Please check your documentation for more information");
})
 
export default server;