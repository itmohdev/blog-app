import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createpost.dto';
import { QueryPostListDto } from './dto/postquery.dto';
import { SearchPostDto } from './dto/searchpost.dto';
import { Post } from './entity/post.entity';
import { PostRepository } from './post.repository';
import { UpdatePostDto } from './dto/updatepost.dto';
import { ResposeAllPosts } from './interface/responsepost';
@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getOnePost(filterInput: SearchPostDto): Promise<Post> {
    try {
      const post = await this.postRepository.findOne(filterInput);
      if (!post)
        throw new HttpException(
          'there are no post with this data',
          HttpStatus.NOT_FOUND,
        );
      return post;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async GetAllPosts(queryInput: QueryPostListDto): Promise<ResposeAllPosts> {
    try {
      const page = queryInput.page || 1;
      queryInput.skip = page === 1 ? 0 : (queryInput.limit || 10) * (page - 1);
      const posts = await this.postRepository.findAll(queryInput);
      if (!posts && Object.keys(queryInput.filterRecord).length != 0)
        throw new HttpException(
          'there are no post with this data',
          HttpStatus.NOT_FOUND,
        );
      const totalPosts = await this.postRepository.countDocumentUser(
        queryInput.filterRecord,
      );
      const totalPages = Math.ceil(totalPosts / (queryInput.limit || 10));
      const respose: ResposeAllPosts = {
        page,
        totalPages,
        totalPosts,
        data: posts,
        haveNextPage: page < totalPages,
        havePrevPage: page !== 1
      }
      return respose;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPost(createInput: CreatePostDto): Promise<Post> {
    try {
      const post = await this.postRepository.create(createInput);
      return post;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePost(
    postId: string,
    userId: string,
    updateInput: UpdatePostDto,
  ): Promise<Post> {
    try {
      const post = await this.getOnePost({ _id: postId });
      if (!post) {
        throw new HttpException(
          'There are no post with this id',
          HttpStatus.NOT_FOUND,
        );
      }

      if (post.userId !== userId)
        throw new HttpException(
          'You not allow to edit this post',
          HttpStatus.UNAUTHORIZED,
        );
      const update = await this.postRepository.update(
        { _id: postId },
        updateInput,
      );
      return update;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePost(postId: string, userId: string): Promise<boolean> {
    try {
      const post = await this.getOnePost({ _id: postId, userId });
      if (post)
        throw new HttpException(
          'There are no post with this id or not permisstion to remove',
          HttpStatus.NOT_FOUND,
        );
      return true;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
