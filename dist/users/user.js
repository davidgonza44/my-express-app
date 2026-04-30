"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.users = void 0;
exports.users = [
    { id: 1, name: "John", email: "JohnExample@gmail.com" },
    { id: 2, name: "Jane", email: "Jane@example.com" }
];
class Users {
    getUserById(userId) {
        if (exports.users.find(i => i.id === userId)) {
            return true;
        }
        return false;
    }
}
exports.Users = Users;
