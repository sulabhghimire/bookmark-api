import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private loggerStart = new Logger('HTTP-REQUEST-START')
    private loggerEnd = new Logger('HTTP-REQUEST-END');


    use(req: Request, res: Response, next: NextFunction) : void {
        const { ip, method, baseUrl: url} = req;
        const userAgent = req.get('user-agent') || '';

        const startTime = Date.now();

        this.loggerStart.log(` : [INFO] User-Agent:${userAgent} User-IP:${ip} Method:${method} URL:${url}`)

        res.on('close', () => {
            const {statusCode} = res;
            const contentLength = res.get('content-length') || '';

            const endTime = Date.now();

            let respType : '[ERROR]' | '[INFO]' | '[FATAL]'

            if (statusCode < 600 && statusCode > 399) respType = '[ERROR]';
            else if (statusCode < 400) respType = '[INFO]';
            else respType = '[FATAL]';
            
            const msg = `   : ${respType} User-Agent:${userAgent} User-IP:${ip} Method:${method} URL:${url} Content-Length:${contentLength} Time-Passed:+${endTime-startTime}ms`

            if(respType === '[ERROR]') this.loggerEnd.error(msg);
            else if(respType === '[INFO]') this.loggerEnd.log(msg);
            else this.loggerEnd.fatal(msg);
            
        });

        next();
    }

}