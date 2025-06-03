class Errorhandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleWare = (err, req,res,next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new Errorhandler(message, 400);
    }
    if(err.code === 11000) {
        const message =  `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new Errorhandler(message, 400);
    }

    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new Errorhandler(message, 4000);
    }
    if(err.name === "TokenExpireError") {
        const message = "Json Web Token is Expired, Try again";
        err = new Errorhandler(message, 400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

export default Errorhandler;