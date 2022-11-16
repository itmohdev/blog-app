import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateuser.dto';
import { QueryInputListDto } from './dto/querylist.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateInput: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateInput);
  }

  @Get("/all")
  async getUsers(@Query() queryInput: QueryInputListDto) {
    return this.userService.findAll(queryInput);
  }
}
