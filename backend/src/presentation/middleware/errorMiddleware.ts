import { ClientError } from "../errors/ClientError";
import { Request, Response, NextFunction } from "express";

export function processErrorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ClientError) {
        let stackLine = err.stack?.split('\n')[1]?.trim();
        let srcFile = stackLine?.match(/src\/[\w\/\.-]+\.ts/);
        const fileInfo = srcFile ? srcFile[0] : stackLine;
        console.info(`${err.message} (${fileInfo})`);
        res.status(err.httpStatusCode).json({ message: err.message });
        return;
    }
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
}