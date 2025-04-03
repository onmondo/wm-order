import { Module } from '@nestjs/common';
import { LoggerService, SupabaseService } from './';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [LoggerService, SupabaseService, ConfigService],
  exports: [LoggerService, SupabaseService],
})
export class SharedModule {}
