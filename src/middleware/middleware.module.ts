import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './request-logger';

@Module({
    providers: [LoggerMiddleware],
    exports: [LoggerMiddleware],
})
export class MiddlewareModule {}
