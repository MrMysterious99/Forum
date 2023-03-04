import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route("/login").post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route("/changePass").post(
    (req, res) => new UserController().changePass(req, res)
)

userRouter.route("/register").post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route("/openChat").post(
    (req, res) => new UserController().openChat(req, res)
)

userRouter.route("/getAllChats").post(
    (req, res) => new UserController().getAllChats(req, res)
)

userRouter.route("/sendMessage").post(
    (req, res) => new UserController().sendMessage(req, res)
)

userRouter.route("/getAll").get(
    (req, res) => new UserController().getAll(req, res)
)

userRouter.route("/saveEdit").post(
    (req, res) => new UserController().saveEdit(req, res)
)

userRouter.route("/deleteUser").post(
    (req, res) => new UserController().deleteUser(req, res)
)


export default userRouter;