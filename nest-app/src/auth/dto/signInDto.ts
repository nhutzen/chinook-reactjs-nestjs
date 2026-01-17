// import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  // @IsNotEmpty({ message: 'Username không được để trống' })
  // @IsString()
  username: string;

  // @IsNotEmpty({ message: 'Password không được để trống' })
  // @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password: string;
}