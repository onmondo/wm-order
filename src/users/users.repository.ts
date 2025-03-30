import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/shared';
import { RegisterUserDto } from './dto/register.user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async createUser(newUserRegistration: RegisterUserDto) {
    const userDbTable = this.supabase.getClient().from('users');

    const { data, error } = await userDbTable.insert([newUserRegistration]);

    if (error) throw error;

    return data;
  }

  async fetchUserByUsername(username: string): Promise<GetUserDto[]> {
    const userDbTable = this.supabase.getClient().from('users');
    const { data, error } = await userDbTable
      .select('fullname, email_address, username, password, active')
      .eq('username', username);

    if (error) throw error;

    return data;
  }
}
