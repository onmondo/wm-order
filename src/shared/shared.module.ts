import { Module } from '@nestjs/common';
import { LoggerService } from 'src/shared/logger-service/logger-service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class SharedModule {}
