"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webHookRouter = (0, express_1.Router)();
const webhook_1 = require("../controllers/webhook");
webHookRouter.post("/getTrains", webhook_1.findTrains);
exports.default = webHookRouter;
//# sourceMappingURL=webhook.js.map