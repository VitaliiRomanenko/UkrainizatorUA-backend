import {NextFunction, Request, Response} from "express";

export default function (err: any, req: Request, res: Response, next: NextFunction){ //dont delete next function!!!
    console.log(err)
    res.status(err.status || 500)
    return res.json({message: err.message || "Unknown error", errors: err.errors})
}