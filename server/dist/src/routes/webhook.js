"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var webHookRouter = (0, express_1.Router)();
var webhook_1 = require("../controllers/webhook");
webHookRouter.post("/getTrains", webhook_1.findTrains);
exports.default = webHookRouter;
