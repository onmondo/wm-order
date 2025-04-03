import { ConfigModule, ConfigService } from '@nestjs/config';

void ConfigModule.forRoot();
const configService = new ConfigService();
export const AUTH_KEY = configService.get<string>('AUTH_KEY');
