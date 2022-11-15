import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { SearchUserDto } from './dto/searchuser.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryInputListDto } from './dto/querylist.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(filterUser: SearchUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: filterUser });
      if (!user) {
        throw new HttpException(
          'there are no user with this data',
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser({ username, password }: CreateUserDto): Promise<User> {
    try {
      const userExist = await this.findUser({ username: username });
      if (userExist) {
        throw new HttpException(
          'please use different username',
          HttpStatus.CONFLICT,
        );
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = await this.userRepository.create({
        username: username,
        password: hashPassword,
      });

      const saveData = await this.userRepository.save(user);
      if (saveData) {
        return user;
      }
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(queryInputList: QueryInputListDto): Promise<[] | User[]> {
    try {
      const users = await this.userRepository.find({
        where: queryInputList.filter,
        skip: queryInputList.skip,
        take: queryInputList.limit || 10,
        order: queryInputList.order,
      });
      return users;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
