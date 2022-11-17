import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateuser.dto';
import { QueryInputListDto } from './dto/querylist.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserRoleDecorator } from './decorator/userrole.decorator';
import { IsAuth } from 'src/auth/guard/isauth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(IsAuth)
  @Post('/:userId')
  async updateUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateInput: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateInput);
  }

  @UseGuards(IsAuth)
  @Get('/all')
  async getUsers(@Query() queryInput: QueryInputListDto) {
    return this.userService.findAll(queryInput);
  }

  @UseGuards(IsAuth)
  @Delete('/:id')
  async removeUser(
    @UserRoleDecorator('admin') role: boolean,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if(!role) throw new HttpException('permisstion not allow', HttpStatus.UNAUTHORIZED);
    return this.userService.removeUser(id);
  }
}
