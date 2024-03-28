import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Health API')
@Controller({
    version: VERSION_NEUTRAL,
    path: 'health',
})
export class HealthController {

    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: PrismaHealthIndicator,
        private prisma: PrismaService,
        private disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
    ){}

    @Get()
    @HealthCheck()
    check(){
        return this.health.check([
            () => this.http.pingCheck('google-ping', 'https://www.google.com'),         // Can use to check status of other resources being used
            () => this.db.pingCheck('database', this.prisma),                           // Database health status checked
            () => this.disk.checkStorage('disk', {path: '/', thresholdPercent: 0.5}),   // Disk Health Status Checked
            () => this.memory.checkHeap('memory_heap', 150*1024*1024),                  // Heap Memory health status checked
            () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),                // RSS Memory health status checked
        ])
    }
}
