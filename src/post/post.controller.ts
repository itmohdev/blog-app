import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IsAuth } from 'src/auth/guard/isauth.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createpost.dto';
import { QueryPostListDto } from './dto/postquery.dto';
import { UpdatePostDto } from './dto/updatepost.dto';

@UseGuards(IsAuth)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createInput: CreatePostDto, @Req() req) {
    const userId = req.user;
    createInput.userId = userId;
    return this.postService.createPost(createInput);
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    return this.postService.getOnePost({ _id: id });
  }

  @Get()
  async FindAll(@Query() queryList: QueryPostListDto) {
    return this.postService.GetAllPosts(queryList);
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Req() req,
    @Body() updateInput: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, req.user?._id, updateInput);
  }

  @Delete('/:id')
  async removePost(@Param('id') id: string, @Req() req) {
    return this.postService.removePost(id, req.user?._id);
  }
}
