import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: string;

  email: string;

  @Exclude()
  password: string;

  firstname: string;

  lastname: string;

  countrycode: string;

  phone: string;

  birthdate: Date;

  image: string;

  verified: boolean;

  gender: $Enums.Gender;

  role: $Enums.Role;

  createdAt: Date;
  
  updatedAt: Date;
}
