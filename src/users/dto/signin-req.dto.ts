import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInRequestDto {
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
