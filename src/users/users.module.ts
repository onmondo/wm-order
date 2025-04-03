import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_KEY } from './user.constants';

@Module({
  imports: [
    SharedModule,
    JwtModule.register({
      global: true,
      secret: AUTH_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
