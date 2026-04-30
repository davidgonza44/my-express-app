interface User {
    id: number,
    name: string,
    email: string
}

export const users : Array<User> = [
    {id: 1, name: "John", email : "JohnExample@gmail.com"},
    {id : 2, name : "Jane", email : "Jane@example.com"}
]

export class Users {
    public getUserById(userId) {
        if (users.find(i => i.id === userId)){
            return true
        } 
        return false
    }
}