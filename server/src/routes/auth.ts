import { signup } from "../auth";
import express from 'express';

const AuthRouter = express.Router();

AuthRouter.post('/signup', signup);

export default AuthRouter;