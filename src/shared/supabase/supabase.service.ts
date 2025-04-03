import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  scope: Scope.DEFAULT,
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.getEnvVar('DATABASE_URL'),
      this.getEnvVar('DATABASE_API_KEY'),
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  private getEnvVar(key: string): string {
    return this.configService.get<string>(key) || '';
  }
}
