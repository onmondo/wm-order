import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class RegisterUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  fullname: string;

  @Expose({ name: 'emailAddress' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @Expose({ name: 'emailAddress' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Length(3, 30)
  username: string;

  @Expose({ name: 'password' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Length(8, 14)
  password: string;
}
