import { Injectable, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  scope: Scope.DEFAULT,
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    if (
      process.env &&
      process.env.DATABASE_URL &&
      process.env.DATABASE_API_KEY
    ) {
      this.supabase = createClient(
        process.env.DATABASE_URL,
        process.env.DATABASE_API_KEY,
      );
    }
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
