import { signup, savedToSearchHistory, savedSearchTrainHistory, getUserHistory } from "../auth";
import express from 'express';

const AuthRouter = express.Router();

AuthRouter.post('/signup', signup);
AuthRouter.post('/savetohistory', savedToSearchHistory);
AuthRouter.post('/savetotrainhistory', savedSearchTrainHistory);
AuthRouter.get('/user/:id/history', getUserHistory);



export default AuthRouter;