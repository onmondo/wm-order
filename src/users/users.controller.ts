import {
  Body,
  Controller,
  HttpCode,
  Injectable,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInRequestDto, SignUpRequestDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@Injectable()
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @HttpCode(200)
  @Post('/signin')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: false
    }),
  )
  async signIn(@Body() signInRequest: SignInRequestDto) {
    const user = await this.user.signInUser(signInRequest);

    return {
      message: 'Success',
      data: user,
    };
  }

  @HttpCode(201)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: false
    }),
  )
  @Post('/signup')
  async signUp(@Body() signUpRequest: SignUpRequestDto) {
    await this.user.registerUser(signUpRequest);
  }
}
