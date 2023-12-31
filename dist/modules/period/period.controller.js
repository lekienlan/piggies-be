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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findOne = exports.findMany = void 0;
var http_status_codes_1 = require("http-status-codes");
var history_1 = require("modules/history");
var token_1 = require("modules/token");
var transaction_1 = require("modules/transaction");
var user_1 = require("modules/user");
var mongoose_1 = require("mongoose");
var catchAsync_1 = __importDefault(require("utils/catchAsync"));
var _1 = require(".");
exports.findMany = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var periods;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, _1.periodService.findMany(req.query)];
            case 1:
                periods = _a.sent();
                res.send(periods);
                return [2];
        }
    });
}); });
exports.findOne = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var period;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, _1.periodService.findOne({
                    id: req.params.id
                })];
            case 1:
                period = _a.sent();
                res.send(period);
                return [2];
        }
    });
}); });
exports.create = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, user, period, transaction;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accessToken = token_1.tokenService.getAccessTokenFromRequest(req);
                return [4, user_1.userService.findByAccessToken(accessToken)];
            case 1:
                user = _b.sent();
                if (!user)
                    throw new mongoose_1.Error('User not found');
                return [4, _1.periodService.create(__assign(__assign({}, req.body), { members: __spreadArray([user === null || user === void 0 ? void 0 : user.id], (req.body.members || []), true), repeat: (_a = req.body.repeat) !== null && _a !== void 0 ? _a : true, expense: 0 }))];
            case 2:
                period = _b.sent();
                return [4, transaction_1.transactionService.create({
                        periodId: period.id,
                        amount: (period.budget || 0) * -1,
                        type: 'budget',
                        userId: user === null || user === void 0 ? void 0 : user.id
                    })];
            case 3:
                transaction = _b.sent();
                return [4, history_1.historyService.create({
                        transactionId: transaction.id,
                        state: 'modified',
                        userId: transaction.userId,
                        data: {
                            amount: transaction.amount,
                            categoryId: transaction.categoryId,
                            currency: transaction.currency,
                            date: transaction.date,
                            note: transaction.note,
                            periodId: transaction.periodId
                        }
                    })];
            case 4:
                _b.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).send(period);
                return [2];
        }
    });
}); });
exports.update = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var period, currentTransaction, updatedTransaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, _1.periodService.update(req.params.id, req.body)];
            case 1:
                period = _a.sent();
                if (!period.budget) return [3, 5];
                return [4, transaction_1.transactionService.findOne({
                        periodId: period === null || period === void 0 ? void 0 : period.id,
                        type: 'budget'
                    })];
            case 2:
                currentTransaction = _a.sent();
                if (!currentTransaction)
                    throw new mongoose_1.Error('Transaction not found');
                return [4, transaction_1.transactionService.update(currentTransaction.id, {
                        amount: period.budget * -1
                    })];
            case 3:
                updatedTransaction = _a.sent();
                return [4, history_1.historyService.create({
                        transactionId: updatedTransaction.id,
                        state: 'modified',
                        userId: updatedTransaction.userId,
                        data: {
                            amount: updatedTransaction.amount,
                            categoryId: updatedTransaction.categoryId,
                            currency: updatedTransaction.currency,
                            date: updatedTransaction.date,
                            note: updatedTransaction.note,
                            periodId: updatedTransaction.periodId
                        }
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                res.send(period);
                return [2];
        }
    });
}); });
exports.remove = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var period;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, _1.periodService.remove({
                    id: req.params.id
                })];
            case 1:
                period = _a.sent();
                res.send(period);
                return [2];
        }
    });
}); });
//# sourceMappingURL=period.controller.js.map