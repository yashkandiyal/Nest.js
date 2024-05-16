import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsEnum(['admin', 'intern', 'admin'], {
    message: 'Role should be either admin, intern or engineer',
  })
  role: 'admin' | 'intern' | 'admin';
}
