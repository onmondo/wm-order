import { Module } from '@nestjs/common';
import { LoggerService, SupabaseService } from './';

@Module({
  providers: [LoggerService, SupabaseService],
  exports: [LoggerService, SupabaseService],
})
export class SharedModule {}
