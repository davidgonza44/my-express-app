"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./utils/errorHandler");
const user_1 = require("./users/user");
const path_1 = __importDefault(require("path"));
const validate = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).send('No hay nombre');
    }
    next();
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set("view engine", "ejs");
app.set('views', path_1.default.join(__dirname, 'views'));
app.get('/ejs', (req, res) => {
    const data = {
        title: "EJS Example",
        message: "Hello from EJS!"
    };
    res.render('index', data);
});
app.get('/api/users', (req, res) => {
    res.json(user_1.users);
});
app.get('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    const user = new user_1.Users();
    const isUserExist = user.getUserById(userId);
    if (!isUserExist) {
        return next(new errorHandler_1.NotFoundException(`User with iD ${userId} not found`));
    }
    res.status(200).json(user);
});
app.post('/api/users', validate, (req, res) => {
    const { name } = req.body;
    res.send(`Hello ${name}`);
});
app.use((err, req, res) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server Error';
    res.status(status).json({ error: message });
});
app.listen(3000, () => {
    console.log("hola 2");
});
