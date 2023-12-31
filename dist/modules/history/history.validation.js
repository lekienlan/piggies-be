"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.params = void 0;
var joi_1 = __importDefault(require("joi"));
var paginate_validation_1 = require("middlewares/paginate/paginate.validation");
exports.params = joi_1.default.object().keys({
    query: joi_1.default.object().keys(__assign(__assign({}, paginate_validation_1.joiPaginate), { transactionId: joi_1.default.string() }))
});
//# sourceMappingURL=history.validation.js.map