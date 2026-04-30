export class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message : string){
        super(message)
        this.status = status
        this.message = message
    }
}

export class NotFoundException extends HttpException {
    constructor(message : string = "Not found"){
        super(404, message)
    }
}