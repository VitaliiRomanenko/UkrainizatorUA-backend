import {Request, Response} from "express";

export default function (err: any, req: Request, res: Response){
    console.log(err as Error)
    return res.status(err.status || 500).json({message: err.message || "Unknown error", errors: err.errors})
}