"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
class NotFoundException extends HttpException {
    constructor(message = "Not found") {
        super(404, message);
    }
}
exports.NotFoundException = NotFoundException;
