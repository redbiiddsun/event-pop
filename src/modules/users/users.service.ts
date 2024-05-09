/*
  * File: users.service.ts
  * Project: Event Pop
  * Module: users
  * File Created: Tuesday, 9th February 2021 11:52:12 pm
  * Author: Phanasorn Srisayam (
*/
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { prismaExclude } from 'src/utils/prismaExclude';
import { User } from '@prisma/client';
import { CustomResponse } from 'src/common/interceptors/response.interceptor';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CustomResponse<Omit<User, 'password'>>> {
    const SALT_ROUNDS = this.configService.get('salt_rounds');

    const user = await this.prisma.user.findUnique({ where: { email: createUserDto.email }});
    if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS,
    );

    createUserDto.password = hashedPassword;
    createUserDto.birthdate = new Date(createUserDto.birthdate);

    const result = await this.prisma.user.create({ data: createUserDto, select: prismaExclude('User', ['password']) });

    return { statusCode: 201, message: 'User created successfully', data: result};
  }

  async findAll(): Promise<CustomResponse<Omit<User, 'password'>[]>> {

    const result = await this.prisma.user.findMany({select: prismaExclude('User', ['password'])});

    return { statusCode: 200, message: 'Display all users', data: result};
  }

  async findOne(id: string): Promise<CustomResponse<Omit<User, 'password'>>> {

    const result = await this.prisma.user.findFirst({where: { id }, select: prismaExclude('User', ['password'])});

    return { statusCode: 201, message: 'User created successfully', data: result};
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<CustomResponse<Omit<User, 'password'>>> {

    //Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id }});
    if (!user) throw new HttpException('User doesn not exists', HttpStatus.BAD_REQUEST);


    const result = await this.prisma.user.delete({where: { id }, select: prismaExclude('User', ['password'])});

    return { statusCode: 200, message: `Delete user ${id} successfully `, data: result};
  }
}
