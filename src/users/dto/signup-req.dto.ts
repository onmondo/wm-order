import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class SignUpRequestDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  fullname: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Length(3, 30)
  username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Length(8, 14)
  password: string;
}
