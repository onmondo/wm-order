import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { SignInRequestDto, SignInUserDto, SignUpRequestDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { RegisterUserDto } from './dto/register.user.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { ICredentials } from './user.interfaces';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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
      const { username, password, active, email_address, fullname } = user[0];
      if (password === userSignInRequest.password) {
        console.log('Generating token...');
        const accessToken = await this.generateAccessToken({
          username,
          isActive: active,
          emailAddress: email_address,
          fullname,
        });
        return { accessToken };
      }
    }

    throw new HttpErrorByCode[401]();
  }

  private async generateAccessToken(credentials: ICredentials) {
    const accessToken = await this.jwtService.signAsync(credentials);
    return accessToken;
  }
}
