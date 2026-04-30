import express from "express"
import { Request, Response } from "express"
import { HttpException, NotFoundException } from './utils/errorHandler'
import { users, Users } from "./users/user"
import path from 'path'
import { title } from "process"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import cookieParser from "cookie-parser"

const validate = (req : Request, res : Response, next : Function) => {
    const { name } = req.body

    if (!name){
        res.status(400).send('No hay nombre')
    }

    next()
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes,
    max : 100
})


const app : express.Application = express()
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' ; img-src 'self' data:, font-src 'self' data:"
    )
    next()
})

app.use(limiter)
app.use(helmet())
app.use(cookieParser())

app.get('/set-cookie', (req , res) => {      
    res.cookie('myCookie', 'someValue', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        
    })

    res.send("cookie sent")
})

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.get('/ejs', (req, res) => {
    const data = {
        title : "EJS Example",
        message : "Hello from EJS!"
    }

    res.render('index', data)
})


app.get('/api/users', (req : Request, res : Response) => {
    res.json(users)
})

app.get('/users/:id', (req, res, next) => {
    const userId = req.params.id
    const user = new Users()
    const isUserExist = user.getUserById(userId)
    if (!isUserExist) {
        return next(new  NotFoundException(`User with iD ${userId} not found`))
    }

    res.status(200).json(user)
})


app.post('/api/users', validate, (req : Request, res: Response) => {
    const {name} = req.body
    res.send(`Hello ${name}`)
})

app.use((err : HttpException, req : Request, res : Response) => {
    const status = err.status || 500
    const message = err.message || 'Internal server Error'

    res.status(status).json({error: message})
})

app.listen(3000, () => {
    console.log("hola 2")
})
