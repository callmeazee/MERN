import { getSession, login, logout, refreshToken, signup, updateProfilePicture } from "../controller/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import RefreshTokenMiddleware from "../middleware/refresh.middleware";

const { Router } = require("express");

const AuthRouter = Router()

AuthRouter.post("/signup", signup)
AuthRouter.post("/login", login)
AuthRouter.post("/logout", logout)
AuthRouter.get("/refresh-token", RefreshTokenMiddleware, refreshToken)
AuthRouter.get("/session", getSession)
AuthRouter.put("/profile-picture", AuthMiddleware, updateProfilePicture)

export default AuthRouter