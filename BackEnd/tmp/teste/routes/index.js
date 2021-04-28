"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=index.js.map