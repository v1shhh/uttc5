import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFileSync('request_log.txt', log);
  next();
}
