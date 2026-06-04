import { login, signup } from "../controller/auth.controller";

const { Router } = require("express");

const authRouter = Router()

authRouter.post("/signup", signup)
authRouter.post("/login", login)

export default authRouter