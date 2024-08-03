"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    try {
        res.json({
            success: true,
            time_stamp: Date.now(),
            data: "Please refer to our documentation for more details: 'https://github.com/AniCrad/indian-rail-api'",
        });
    }
    catch (err) {
        res.json({ Error: err });
    }
});
exports.default = router;
//# sourceMappingURL=home.js.map