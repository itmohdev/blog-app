import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { SearchUserDto } from './dto/searchuser.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryInputListDto } from './dto/querylist.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CredientialUserDto } from './dto/credientialuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(filterUser: SearchUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: filterUser as FindOptionsWhere<User>});
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
      const hashPassword = await this.createHashPassword(password);
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
        where: queryInputList.filter as FindOptionsWhere<User>,
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

  async updateUser(userId: string, updateInput: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findUser({ id: userId });
      if (updateInput.username) {
        const existUsername = await this.findUser({
          username: updateInput.username,
        });
        if (existUsername) {
          throw new HttpException(
            'this username is used before',
            HttpStatus.CONFLICT,
          );
        }
      }

      if (updateInput.password) {
        updateInput.password = await this.createHashPassword(
          updateInput.password,
        );
      }
      const update = await this.userRepository.update(user.id, updateInput as Partial<User>);
      const updatedUser = await this.findUser({ id: userId });
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async credientialUser({
    username,
    password,
  }: CredientialUserDto): Promise<User> {
    try {
      const user = await this.findUser({ username: username });
      if (!user) {
        throw new HttpException(
          'there are no user with this crediential',
          HttpStatus.NOT_FOUND,
        );
      }
      const comparePassword = await this.confirmPassword(
        password,
        user.password,
      );
      if (!comparePassword) {
        throw new HttpException(
          'there are no user with this crediential',
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

  async removeUser(userId: string): Promise<boolean> {
    try {
      const user = await this.findUser({ id: userId });
      if (!user)
        throw new HttpException('no user with this id', HttpStatus.NOT_FOUND);
      const remove = await this.userRepository.softRemove(user);
      return true;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async createHashPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new HttpException('error in hash password', HttpStatus.FORBIDDEN);
    }
  }

  private async confirmPassword(password, hash): Promise<boolean> {
    try {
      const comparePassword = await bcrypt.compare(password, hash);
      if (!comparePassword) {
        throw new HttpException(
          'some crediential is wrong',
          HttpStatus.FORBIDDEN,
        );
      }
      return comparePassword;
    } catch (error) {
      throw new HttpException('error in compare password', HttpStatus.CONFLICT);
    }
  }
}
