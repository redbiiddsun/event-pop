import { $Enums, User } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

type CreateUserType = Pick<
  User,
  'email' | 'firstname' | 'lastname' | 'password' | 'birthdate' | 'gender'
>;

export class CreateUserDto implements CreateUserType {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @IsEnum($Enums.Gender)
  @IsOptional()
  gender: $Enums.Gender;
}
