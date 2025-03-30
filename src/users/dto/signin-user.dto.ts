import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class SignInUserDto {
  @Expose()
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
