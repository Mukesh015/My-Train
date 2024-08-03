"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../auth");
const express_1 = __importDefault(require("express"));
const AuthRouter = express_1.default.Router();
AuthRouter.post('/signup', auth_1.signup);
AuthRouter.post('/savetohistory', auth_1.savedToSearchHistory);
AuthRouter.post('/savetotrainhistory', auth_1.savedSearchTrainHistory);
AuthRouter.get('/user/:id/history', auth_1.getUserHistory);
exports.default = AuthRouter;
//# sourceMappingURL=auth.js.map