export default class CustomError extends Error {
    constructor(err, detail='') {
        if(detail != '') console.log(detail);
        super(err.msg);
        this.statusCode = err.code;
        this.customError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}