import { Module } from '@nestjs/common';
import { AuthGuard, LoggerService, SupabaseService } from './';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    LoggerService,
    SupabaseService,
    AuthGuard,
    ConfigService,
    JwtService,
  ],
  exports: [LoggerService, SupabaseService, AuthGuard],
})
export class SharedModule {}
