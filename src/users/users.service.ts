import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { SignInRequestDto, SignInUserDto, SignUpRequestDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { RegisterUserDto } from './dto/register.user.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async registerUser(userRegistrationRequest: SignUpRequestDto) {
    const newUserRegistration = plainToInstance(
      RegisterUserDto,
      userRegistrationRequest,
    );

    const user = await this.repository.fetchUserByUsername(
      userRegistrationRequest.username,
    );

    if (user && user.length > 0) {
      console.log('user exist', user);
      throw new HttpErrorByCode[409]();
    }
    await this.repository.createUser(newUserRegistration);
  }

  async signInUser(userSignInRequest: SignInRequestDto) {
    console.log('userSignInRequest', userSignInRequest);
    const signInUser = plainToInstance(SignInUserDto, userSignInRequest);
    console.log('signInUser', signInUser);
    const user = await this.repository.fetchUserByUsername(signInUser.username);
    console.log('user', user);
    if (user && user.length > 0) {
      if (user[0].password === userSignInRequest.password) {
        // Generate token here
        console.log('Generating token...');
        return user[0].username;
      }
    }

    throw new HttpErrorByCode[401]();
  }
}
